import { CommonModule } from "@angular/common";
import {
  Component,
  HostListener,
  computed,
  effect,
  signal,
} from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

import { Menu } from "./lib/components/menu.component";
import { SONGS, type SongEntry } from "./lib/data/songs";

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
  l: number;
  r: number;
};

type SongResult = {
  title: string;
  album: string;
  rank: number;
};

type PageStateFinished = { finished: true; songs: SongResult[] };
type PageStateUnfinished = { finished: false; options: [SongEntry, SongEntry] };
type PageState = PageStateFinished | PageStateUnfinished;

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, Menu],
  styleUrl: "./app.component.css",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  protected readonly history = signal<Selection[]>([]);
  protected readonly restartRequested = signal(false);
  protected readonly seed = signal(1);
  private readonly songs = computed(() =>
    SONGS.map((value, i) => ({ value, sort: (Math.sin(i) * this.seed()) % 1 }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  );

  public constructor() {
    const savedHistory = localStorage.getItem("history");
    const seed = localStorage.getItem("seed");
    if (savedHistory && seed) {
      this.history.set(JSON.parse(savedHistory));
      this.seed.set(parseFloat(seed));
    } else {
      this.shuffleCards();
    }

    effect(() => {
      localStorage.setItem("history", JSON.stringify(this.history()));
      localStorage.setItem("seed", this.seed().toString());
    });
  }

  private shuffleCards(): void {
    this.seed.set(Math.random() * 100000);
  }

  private arrangeCards(): void {
    this.seed.set(1);
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

  public pageState = computed<PageState>(() => {
    try {
      const arr = this.songs().map((x) => [x]);
      const his = [...this.history()];
      const res = this.mergesort({ arr, his, l: 0, r: arr.length - 1 });

      const songsResults = res.map<SongResult[]>((songRes, i) =>
        songRes.map((song) => ({ ...song, rank: i + 1 }))
      );
      const songs = songsResults.flat();
      return { finished: true, songs };
    } catch (e) {
      if (!(e instanceof UnfinishedException)) throw e;
      const options: [SongEntry, SongEntry] = [
        this.chooseRandom(e.v1),
        this.chooseRandom(e.v2),
      ];
      return { finished: false, options };
    }
  });

  public selectOption(option: Selection): void {
    this.history.update((x) => [...x, option]);
  }

  public requestRestart(): void {
    this.restartRequested.set(true);
  }

  public confirmRestart(): void {
    this.restartRequested.set(false);
    this.history.set([]);
    this.shuffleCards();
  }

  public undo(): void {
    if (this.history().length == 0) return;
    this.history.update((his) => his.slice(0, -1));
  }

  private chooseRandom<T>(arr: T[]): T {
    const ind = Math.floor(Math.random() * arr.length);
    return arr[ind];
  }

  private merge({ arr, his, l, r, m }: MergeArgs): void {
    const newArr: SongEntry[][] = [];
    let [p1, p2] = [l, m + 1];

    while (p1 <= m && p2 <= r) {
      const v1 = arr[p1];
      if (v1.length == 0) {
        p1++;
        newArr.push([]);
        continue;
      }
      const v2 = arr[p2];
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
        newArr.push([...v1, ...v2]);
        newArr.push([]);
        p1++;
        p2++;
      }
    }

    while (p1 <= m) {
      newArr.push(arr[p1]);
      p1++;
    }
    while (p2 <= r) {
      newArr.push(arr[p2]);
      p2++;
    }

    newArr.forEach((val, ind) => {
      arr[l + ind] = val;
    });
  }

  private mergesort({ arr, his, l, r }: MergesortArgs): SongEntry[][] {
    if (l >= r) return [arr[l], arr[r]];

    const m = Math.floor((l + r) / 2);
    this.mergesort({ arr, his, l, r: m });
    this.mergesort({ arr, his, r, l: m + 1 });
    this.merge({ arr, his, l, r, m });
    return arr;
  }

  public fillHistory(): void {
    this.history.set(this.history().concat(new Array(1024).fill("left")));
  }
}
