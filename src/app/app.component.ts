import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import {
  Component,
  HostListener,
  computed,
  effect,
  inject,
  signal,
} from "@angular/core";

import { Menu } from "$lib/components/menu.component";
import { Settings } from "$lib/components/settings.component";
import { ALBUMS, COLOURS, SONGS, type SongEntry } from "$lib/data/songs";
import { getBinaryPairings, shuffleArr } from "$lib/utils";

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

type SongResult = {
  title: string;
  album: string;
  rank: number;
};
type SongOptions = [SongEntry, SongEntry];

type SortType = "random" | "byAlbum";
type Selection = "left" | "right" | "tie";
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
  protected readonly SHOW_RANDOM_RANKING_OPTION = true;

  private readonly sanitiser = inject(DomSanitizer);

  protected readonly COLOURS = COLOURS;

  protected readonly history = signal<Selection[]>([]);
  protected readonly restartRequested = signal(false);
  protected readonly seed = signal(1);
  protected readonly sortType = signal<SortType>("byAlbum");

  protected readonly started = computed<boolean>(() => {
    return this.history().length > 0;
  });

  public constructor() {
    this.randomiseSeed();
    this.loadFromLocalStorage();
    effect(() => this.saveToLocalStorage());
  }

  public readonly pageState = computed<PageState>(() => {
    try {
      const songs = this.sortSongs();
      return { finished: true, songs };
    } catch (e) {
      if (!(e instanceof UnfinishedException)) throw e;

      const options: SongOptions = [e.v1[0], e.v2[0]];
      return { finished: false, options };
    }
  });

  /* Buttons */

  public selectOption(option: Selection): void {
    this.restartRequested.set(false);
    this.history.update((x) => [...x, option]);
  }

  public selectSortType(sortType: SortType): void {
    switch (sortType) {
      case "byAlbum":
        this.sortType.set("byAlbum");
        break;
      case "random":
        this.sortType.set("random");
        this.randomiseSeed();
        break;
    }
  }

  public undo(): void {
    if (this.history().length == 0) return;
    this.restartRequested.set(false);
    this.history.update((his) => his.slice(0, -1));
  }

  public requestRestart(): void {
    this.restartRequested.set(true);
  }

  public confirmRestart(): void {
    this.restartRequested.set(false);
    this.history.set([]);
    this.randomiseSeed();
  }

  private randomiseSeed(): void {
    this.seed.set(Math.random() * 100000);
  }

  /* Sorting */

  private sortSongs(): SongResult[] {
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

    return songs;
  }

  private randomSort() {
    const arr = shuffleArr(SONGS, this.seed()).map((x) => [x]);
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
    albumBounds.forEach((bounds) => this.mergesort({ arr, his, bounds }));

    const indexPairings = getBinaryPairings(ALBUMS.length);
    for (let { l: lInd, m: mInd, r: rInd } of indexPairings) {
      const l = albumBounds[lInd][0];
      const m = albumBounds[mInd]?.[0] ?? SONGS.length;
      const r = albumBounds[rInd]?.[0] ?? SONGS.length;
      this.merge({ arr, his, l, m, r });
    }

    return arr;
  }

  /* Merging */

  private mergesort(args: {
    arr: SongEntry[][];
    his: Selection[];
    bounds?: [number, number];
  }) {
    const { arr, his, bounds } = args;
    const [start, end] = bounds ?? [0, arr.length];

    const pairings = getBinaryPairings(end - start, start);
    for (let { l, m, r: rMax } of pairings) {
      const r = Math.min(end, rMax);
      this.merge({ arr, his, l, m, r });
    }

    return arr;
  }

  private merge(args: {
    arr: SongEntry[][];
    his: Selection[];
    l: number;
    r: number;
    m: number;
  }) {
    const { arr, his, l, m, r } = args;

    const newArr: SongEntry[][] = [];
    let [p1, p2] = [l, m];

    while (p1 < m && p2 < r && p2 < arr.length) {
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

      switch (his.shift()!) {
        case "left":
          newArr.push(v1);
          p1++;
          break;
        case "right":
          newArr.push(v2);
          p2++;
          break;
        case "tie":
          newArr.push([...v1, ...v2], []);
          p1++;
          p2++;
          break;
      }
    }

    newArr.push(...arr.slice(p1, m));
    newArr.push(...arr.slice(p2, r));
    newArr.forEach((val, ind) => {
      arr[l + ind] = val;
    });
  }

  /* Spotify */

  public getSpotifyLink(song: SongEntry): SafeResourceUrl {
    const baseUrl = "https://open.spotify.com/embed";
    const uriType = song.spotifyIsPodcast ? "episode" : "track";
    const url = `${baseUrl}/${uriType}/${song.spotifyId}`;
    return this.sanitiser.bypassSecurityTrustResourceUrl(url);
  }

  /* Styling */

  public getOptionStyle(song: SongEntry): string {
    return `background-color: ${COLOURS[song.album]}40`;
  }

  /* Local storage */

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

  /* Hotkeys */

  @HostListener("window:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.pageState().finished) return;

    const actions: Record<string, VoidFunction> = {
      ArrowUp: () => this.selectOption("tie"),
      ArrowDown: () => this.selectOption("tie"),
      ArrowLeft: () => this.selectOption("left"),
      ArrowRight: () => this.selectOption("right"),
      Backspace: () => this.undo(),
    } as const;
    actions[event.key]();
  }

  /* Local development */

  public fillHistory(): void {
    this.history.set(this.history().concat(new Array(1028).fill("left")));
  }
}
