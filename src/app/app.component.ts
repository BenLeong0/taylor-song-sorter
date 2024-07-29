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
import { Ranking } from "$lib/components/ranking.component";
import { Settings } from "$lib/components/settings.component";
import { ALBUMS, COLOURS, SONGS, type SongEntry } from "$lib/data/songs";
import { SongResult } from "$lib/types";
import { getBinaryPairings, shuffleArr, sum } from "$lib/utils";
import * as env from "$lib/env";

class UnfinishedException extends Error {
  v1: SongEntry[];
  v2: SongEntry[];
  progress: string;

  constructor(
    message: string,
    v1: SongEntry[],
    v2: SongEntry[],
    progress: string
  ) {
    super(message);
    this.name = this.constructor.name;
    this.v1 = v1;
    this.v2 = v2;
    this.progress = progress;
  }
}

type SongOptions = [SongEntry, SongEntry];

type SortType = "random" | "byAlbum";
type Selection = "left" | "right" | "tie";
type PageStateFinished = { finished: true; songs: SongResult[] };
type PageStateUnfinished = {
  finished: false;
  progress: string;
  options: SongOptions;
};
type PageState = PageStateFinished | PageStateUnfinished;

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, Menu, Ranking, Settings],
  styleUrl: "./app.component.css",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  protected readonly SHOW_RANDOM_RANKING_OPTION =
    env.SHOW_RANDOM_RANKING_OPTION;

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

      const progress = e.progress;
      const options: SongOptions = [e.v1[0], e.v2[0]];
      return { finished: false, progress, options };
    }
  });

  /* Actions */

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

    const ranking = this.assignRanks(res);
    return ranking;
  }

  private randomSort() {
    const arr = shuffleArr(SONGS, this.seed()).map((x) => [x]);
    const his = [...this.history()];
    return this.mergesort({ songs: arr, his, progress: 0 }).songs;
  }

  private albumSort() {
    let progress = 0;

    const albumBounds = ALBUMS.map<[number, number]>((album) => [
      SONGS.findIndex((song) => song.album === album),
      SONGS.findLastIndex((song) => song.album === album) + 1,
    ]).sort((x) => x[0]);

    const arr = SONGS.map((x) => [x]);
    const his = [...this.history()];
    albumBounds.forEach((bounds) => {
      const res = this.mergesort({ songs: arr, his, bounds, progress });
      progress = res.progress;
    });

    const indexPairings = getBinaryPairings(ALBUMS.length);
    for (let { l: lInd, m: mInd, r: rInd } of indexPairings) {
      const l = albumBounds[lInd][0];
      const m = albumBounds[mInd]?.[0] ?? SONGS.length;
      const r = albumBounds[rInd]?.[0] ?? SONGS.length;
      const res = this.merge({ songs: arr, his, l, m, r, progress });
      progress = res.progress;
    }

    return arr;
  }

  private assignRanks(sortResult: SongEntry[][]): SongResult[] {
    return sortResult
      .map((songRes, i) => songRes.map((song) => ({ ...song, rank: i + 1 })))
      .map((rank) => rank.sort((s1, s2) => (s1.title < s2.title ? -1 : 1)))
      .flat();
  }

  /* Merging */

  private mergesort(args: {
    songs: SongEntry[][];
    his: Selection[];
    progress: number;
    bounds?: [number, number];
  }): { songs: SongEntry[][]; progress: number } {
    const { songs, his, bounds } = args;
    const [start, end] = bounds ?? [0, songs.length];
    let progress = args.progress;

    const pairings = getBinaryPairings(end - start, start);
    for (let { l, m, r: rMax } of pairings) {
      const r = Math.min(end, rMax);
      const res = this.merge({ songs, his, l, m, r, progress });
      progress = res.progress;
    }

    return { songs, progress };
  }

  private merge(args: {
    songs: SongEntry[][];
    his: Selection[];
    l: number;
    r: number;
    m: number;
    progress: number;
  }): { progress: number } {
    const { songs, his, l } = args;
    let progress = args.progress;

    const r = Math.min(args.r, songs.length);
    const m = Math.min(args.m, r);

    const newArr: SongEntry[][] = [];
    let [p1, p2] = [l, m];

    while (p1 < m && p2 < r && p2 < songs.length) {
      const [v1, v2] = [songs[p1], songs[p2]];
      if (v1.length == 0) {
        newArr.push([]);
        p1++;
        continue;
      }
      if (v2.length == 0) {
        newArr.push([]);
        p2++;
        continue;
      }

      if (his.length == 0) {
        const sortType = this.sortType();
        const progressPercent = this.getProgressPercent(progress, sortType);
        throw new UnfinishedException("not finished!", v1, v2, progressPercent);
      }

      const ans = his.shift()!;
      switch (ans) {
        case "left":
          newArr.push(v1);
          progress += v1.length;
          p1++;
          break;
        case "right":
          newArr.push(v2);
          progress += v2.length;
          p2++;
          break;
        case "tie":
          newArr.push([...v1, ...v2], []);
          progress += v1.length + v2.length;
          p1++;
          p2++;
          break;
      }
    }

    newArr.push(...songs.slice(p1, m));
    progress += m - p1;

    newArr.push(...songs.slice(p2, r));
    progress += r - p2;

    newArr.forEach((val, ind) => {
      songs[l + ind] = val;
    });

    return { progress };
  }

  /* Spotify */

  public getSpotifyLink(song: SongEntry): SafeResourceUrl {
    const baseUrl = "https://open.spotify.com/embed";
    const uriType = song.spotifyIsPodcast ? "episode" : "track";
    const url = `${baseUrl}/${uriType}/${song.spotifyId}`;
    return this.sanitiser.bypassSecurityTrustResourceUrl(url);
  }

  /* Progress */

  protected getProgressPercent(progress: number, sortType: SortType): string {
    return ((100 * progress) / this.getMaxProgress(sortType)).toFixed(2);
  }

  private getMaxProgress(sortType: SortType): number {
    switch (sortType) {
      case "random":
        return SONGS.length * Math.ceil(Math.log2(SONGS.length));

      case "byAlbum":
        const albumLengths = ALBUMS.map(
          (album) => SONGS.filter((song) => song.album === album).length
        );

        const part1 = sum(
          albumLengths.map((length) => length * Math.ceil(Math.log2(length)))
        );

        const pairings = getBinaryPairings(ALBUMS.length);
        const part2 = sum(
          [...pairings].map(({ l, r }) => sum(albumLengths.slice(l, r)))
        );

        return part1 + part2;
    }
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
    const action = actions[event.key];
    action && action();
  }

  /* Local development */

  public fillHistory(): void {
    this.history.set([]);
    while (true) {
      try {
        this.sortSongs();
        break;
      } catch {
        const choice = Math.floor(2 * Math.random()) ? "left" : "right";
        this.history.update((h) => [...h, choice]);
      }
    }
  }
}
