import { CommonModule } from "@angular/common";
import {
  Component,
  HostListener,
  computed,
  effect,
  signal,
} from "@angular/core";

import { Menu } from "$lib/components/menu.component";
import { Settings } from "$lib/components/settings.component";
import { ALBUMS, COLOURS, SONGS, type SongEntry } from "$lib/data/songs";

type Selection = "left" | "right" | "tie";

class UnfinishedException extends Error {
  v1: SongEntry[];
  v2: SongEntry[];

  constructor(message: string, v1: SongEntry[], v2: SongEntry[]) {
    super(message);
    this.name = this.constructor.name;
    this.v1 = v1;
    this.v2 = v2;
  }
}

type MergeArgs = {
  arr: SongEntry[][];
  his: Selection[];
  l: number;
  r: number;
  m: number;
};

type MergesortArgs = {
  arr: SongEntry[][];
  his: Selection[];
  farL?: number;
  farR?: number;
};

type SongResult = {
  title: string;
  album: string;
  rank: number;
};
type SongOptions = [SongEntry, SongEntry];

type SortType = "random" | "byAlbum";

type PageStateFinished = { finished: true; songs: SongResult[] };
type PageStateUnfinished = { finished: false; options: SongOptions };
type PageState = PageStateFinished | PageStateUnfinished;

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, Menu, Settings],
  styleUrl: "./app.component.css",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  protected readonly SHOW_RANDOM_RANKING_OPTION = false;

  protected readonly COLOURS = COLOURS;

  protected readonly history = signal<Selection[]>([]);
  protected readonly restartRequested = signal(false);
  protected readonly seed = signal(1);
  protected readonly sortType = signal<SortType>("byAlbum");

  protected readonly started = computed<boolean>(() => {
    console.log(this.history());
    return this.history().length > 0;
  });

  public constructor() {
    this.randomiseSeed();
    this.loadFromLocalStorage();
    effect(() => this.saveToLocalStorage());
  }

  public readonly pageState = computed<PageState>(() => {
    try {
      const sortType = this.sortType();
      const res = sortType === "random" ? this.randomSort() : this.albumSort();

      const songs: SongResult[] = res
        .slice(res.findIndex((x) => x.length > 0))
        .map((songRes, i) =>
          songRes
            .map((song) => ({ ...song, rank: i + 1 }))
            .sort((s1, s2) => (s1.title < s2.title ? -1 : 1))
        )
        .flat();

      return { finished: true, songs };
    } catch (e) {
      if (!(e instanceof UnfinishedException)) throw e;
      const options: SongOptions = [
        this.chooseRandom(e.v1),
        this.chooseRandom(e.v2),
      ];
      return { finished: false, options };
    }
  });

  public toggleSortType() {
    const newValue = this.sortType() == "random" ? "byAlbum" : "random";
    this.sortType.set(newValue);
  }

  public selectOption(option: Selection): void {
    this.history.update((x) => [...x, option]);
  }

  public requestRestart(): void {
    this.restartRequested.set(true);
  }

  public confirmRestart(): void {
    this.restartRequested.set(false);
    this.history.set([]);
    this.randomiseSeed();
  }

  public undo(): void {
    if (this.history().length == 0) return;
    this.history.update((his) => his.slice(0, -1));
  }

  private mergesort({ arr, his, farL, farR }: MergesortArgs) {
    const start = farL ?? 0;
    const end = farR ?? arr.length;
    for (let n = 0; n < Math.log2(end); n++) {
      for (let l = start; l < end; l += 2 ** (n + 1)) {
        const m = l + 2 ** n;
        const r = Math.min(m + 2 ** n, end);
        this.merge({ arr, his, l, m, r });
      }
    }

    return arr;
  }

  private merge({ arr, his, l, m, r }: MergeArgs) {
    if (m >= r) return;
    let [p1, p2] = [l, m];
    const newArr: SongEntry[][] = [];
    while (p1 < m && p2 < r) {
      const [v1, v2] = [arr[p1], arr[p2]];
      if (v1.length == 0) {
        p1++;
        newArr.push([]);
        continue;
      }
      if (v2.length == 0) {
        p2++;
        newArr.push([]);
        continue;
      }

      if (his.length == 0) {
        throw new UnfinishedException("not finished!", v1, v2);
      }

      const ans = his.shift();
      if (ans == "left") {
        newArr.push(v1);
        p1++;
      } else if (ans == "right") {
        newArr.push(v2);
        p2++;
      } else if (ans == "tie") {
        newArr.push([...v1, ...v2], []);
        p1++;
        p2++;
      }
    }

    newArr.push(...arr.slice(p1, m));
    newArr.push(...arr.slice(p2, r));
    newArr.forEach((val, ind) => {
      arr[l + ind] = val;
    });
  }

  private randomSort() {
    const arr = this.shuffleArr(SONGS, this.seed()).map((x) => [x]);
    const his = [...this.history()];
    return this.mergesort({ arr, his });
  }

  private albumSort() {
    const albumBounds = ALBUMS.map<[number, number]>((album) => [
      SONGS.findIndex((song) => song.album === album),
      SONGS.findLastIndex((song) => song.album === album) + 1,
    ]).sort((x) => x[0]);

    const arr = SONGS.map((x) => [x]);
    const his = [...this.history()];
    for (let i = 0; i < albumBounds.length; i++) {
      const farL = albumBounds[i][0];
      const farR = albumBounds[i][1];
      this.mergesort({ arr, his, farL, farR });
    }

    for (let n = 0; n < Math.log2(ALBUMS.length); n++) {
      for (let lInd = 0; lInd < ALBUMS.length; lInd += 2 ** (n + 1)) {
        const l = albumBounds[lInd][0];

        const mInd = lInd + 2 ** n;
        if (mInd >= ALBUMS.length) continue;
        const m = albumBounds[mInd][0];

        const rInd = Math.min(mInd + 2 ** n, ALBUMS.length - 1);
        const r = albumBounds[rInd][1];

        this.merge({ arr, his, l, m, r });
      }
    }

    return arr;
  }

  // MOVE TO UTILS
  private chooseRandom<T>(arr: T[]): T {
    const ind = Math.floor(Math.random() * arr.length);
    return arr[ind];
  }

  // MOVE TO UTILS
  private shuffleArr<T>(arr: T[], seed: number): T[] {
    return arr
      .map((value, i) => ({ value, sort: (Math.sin(i) * seed) % 1 }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  public fillHistory(): void {
    this.history.set(this.history().concat(new Array(1028).fill("left")));
  }

  public randomiseSeed(): void {
    this.seed.set(Math.random() * 100000);
  }

  public getOptionStyle(song: SongEntry): string {
    return `background-color: ${COLOURS[song.album]}40`;
  }

  private saveToLocalStorage() {
    localStorage.setItem("history", JSON.stringify(this.history()));
    localStorage.setItem("seed", this.seed().toString());
    localStorage.setItem("sortType", this.sortType().toString());
  }

  private loadFromLocalStorage() {
    const savedHistory = localStorage.getItem("history");
    const seed = localStorage.getItem("seed");
    const sortType = localStorage.getItem("sortType");

    if (!savedHistory || !seed || !sortType) return;
    this.history.set(JSON.parse(savedHistory));
    this.seed.set(parseFloat(seed));
    this.sortType.set(sortType as SortType);
  }

  @HostListener("window:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowLeft":
        this.selectOption("left");
        break;
      case "ArrowRight":
        this.selectOption("right");
        break;
      case "ArrowUp":
      case "ArrowDown":
        this.selectOption("tie");
        break;
      case "Backspace":
        this.undo();
        break;
    }
  }
}
