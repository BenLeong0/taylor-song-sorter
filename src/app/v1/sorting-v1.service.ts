import { computed, Injectable, signal } from "@angular/core";

import { ALBUMS, SONGS, type SongEntry } from "./songs-v1";
import { getBinaryPairings, shuffleArr, sum } from "$lib/utils";
import { SongResult } from "$lib/types";

export type SortType = "random" | "byAlbum";
export type Selection = "left" | "right" | "tie";
export type SongOptions = [SongEntry, SongEntry];

type MergeResult =
  | { complete: true; progress: number; songs: SongEntry[][] }
  | { complete: false; progress: number; decision: [SongEntry[], SongEntry[]] };

type SortResult =
  | { complete: true; ranking: SongResult[] }
  | { complete: false; percentDone: string; options: SongOptions };

@Injectable({
  providedIn: "root",
})
export class SortingV1Service {
  public readonly sortType = signal<SortType>("byAlbum");
  public selectSortType(sortType: SortType): void {
    this.randomiseSeed();
    this.sortType.set(sortType);
  }

  /* Randomisation */
  protected readonly seed = signal(1);
  public randomiseSeed(): void {
    this.seed.set(Math.random() * 100000);
  }

  /* History */
  private readonly history = signal<Selection[]>([]);
  public readonly numDecisionsMade = computed<number>(
    () => this.history().length,
  );
  public readonly started = computed<boolean>(
    () => this.numDecisionsMade() > 0,
  );

  /* Actions */
  public selectOption(option: Selection): void {
    this.history.update((x) => [...x, option]);
  }
  public undo(): void {
    this.history.update((his) => his.slice(0, -1));
  }
  public restart() {
    this.history.set([]);
    this.randomiseSeed();
  }

  /* Sorting */
  public readonly sortResult = computed<SortResult>(() => {
    const res =
      this.sortType() === "random" ? this.randomSort() : this.albumSort();

    if (res.complete === true) {
      const ranking = this.buildRanking(res.songs);
      return { complete: true, ranking };
    } else {
      const { decision, progress } = res;
      const options = [decision[0][0], decision[1][0]] satisfies SongOptions;
      const percentDone = this.getPercentDone(progress);
      return { complete: false, percentDone, options };
    }
  });

  private randomSort(): MergeResult {
    const songs = shuffleArr(SONGS, this.seed()).map((x) => [x]);
    const his = [...this.history()];
    const res = this.mergesort({ songs, his });
    return res;
  }

  private albumSort(): MergeResult {
    const albumBounds = ALBUMS.map<[number, number]>((album) => [
      SONGS.findIndex((song) => song.album === album),
      SONGS.findLastIndex((song) => song.album === album) + 1,
    ]).sort((x) => x[0]);

    const his = [...this.history()];
    let songs = SONGS.map((x) => [x]);
    let progress = 0;
    for (const bounds of albumBounds) {
      const res = this.mergesort({ songs, his, bounds, progress });

      if (!res.complete) return res;
      songs = res.songs;
      progress = res.progress;
    }

    const indexPairings = getBinaryPairings(ALBUMS.length);
    for (let { l: lInd, m: mInd, r: rInd } of indexPairings) {
      const l = albumBounds[lInd][0];
      const m = albumBounds[mInd]?.[0] ?? SONGS.length;
      const r = albumBounds[rInd]?.[0] ?? SONGS.length;
      const res = this.merge({ songs, his, l, m, r, progress });

      if (!res.complete) return res;
      songs = res.songs;
      progress = res.progress;
    }

    return { complete: true, progress, songs };
  }

  /* Merging */
  private mergesort(args: {
    songs: SongEntry[][];
    his: Selection[];
    bounds?: [number, number];
    progress?: number;
  }): MergeResult {
    const { his, bounds } = args;
    let songs = [...args.songs];
    const [start, end] = bounds ?? [0, songs.length];

    let progress = args.progress ?? 0;
    const pairings = getBinaryPairings(end - start, start);
    for (let { l, m, r: rMax } of pairings) {
      const r = Math.min(end, rMax);
      const mergeRes = this.merge({ songs, his, l, m, r, progress });

      if (mergeRes.complete === false) return mergeRes;
      songs = mergeRes.songs;
      progress = mergeRes.progress;
    }

    return { complete: true, progress, songs };
  }

  private merge(args: {
    songs: SongEntry[][];
    his: Selection[];
    l: number;
    r: number;
    m: number;
    progress: number;
  }): MergeResult {
    const { songs, his, l } = args;
    const r = Math.min(args.r, songs.length);
    const m = Math.min(args.m, r);
    let progress = args.progress;

    const newArr: SongEntry[][] = [];
    let [pointerL, pointerR] = [l, m];

    while (pointerL < m && pointerR < r && pointerR < songs.length) {
      const [v1, v2] = [songs[pointerL], songs[pointerR]];
      if (v1.length == 0) {
        newArr.push([]);
        pointerL++;
        continue;
      }
      if (v2.length == 0) {
        newArr.push([]);
        pointerR++;
        continue;
      }

      if (his.length == 0) {
        return {
          complete: false,
          progress: progress,
          decision: [v1, v2],
        };
      }

      const ans = his.shift()!;
      switch (ans) {
        case "left":
          newArr.push(v1);
          progress += v1.length;
          pointerL++;
          break;
        case "right":
          newArr.push(v2);
          progress += v2.length;
          pointerR++;
          break;
        case "tie":
          newArr.push([...v1, ...v2], []);
          progress += v1.length + v2.length;
          pointerL++;
          pointerR++;
          break;
      }
    }

    const leftRemaining = songs.slice(pointerL, m);
    newArr.push(...leftRemaining);
    progress += sum(leftRemaining.map((x) => x.length));

    const rightRemaining = songs.slice(pointerR, r);
    newArr.push(...rightRemaining);
    progress += sum(rightRemaining.map((x) => x.length));

    const outputSongs = [...songs];
    newArr.forEach((v, i) => {
      outputSongs[l + i] = v;
    });
    return { complete: true, progress: progress, songs: outputSongs };
  }

  /* Sort result */
  private buildRanking(songs: SongEntry[][]): SongResult[] {
    const firstIndex = songs.findIndex((x) => x.length > 0);
    const addRank = (i: number) => (s: SongEntry) => ({ ...s, rank: i + 1 });
    const sortByTitle = (s1: SongEntry, s2: SongEntry) =>
      s1.title < s2.title ? -1 : 1;

    return songs
      .slice(firstIndex)
      .map((songRes, i) => songRes.map(addRank(i)).sort(sortByTitle))
      .flat();
  }

  private readonly maxProgress = computed<number>(() => {
    if (this.sortType() === "random") {
      return SONGS.length * Math.ceil(Math.log2(SONGS.length));
    }

    const albumLengths = ALBUMS.map(
      (album) => SONGS.filter((song) => song.album === album).length,
    );
    const part1 = sum(
      albumLengths.map((length) => length * Math.ceil(Math.log2(length))),
    );

    const pairings = getBinaryPairings(ALBUMS.length);
    const part2 = sum(
      [...pairings].map(({ l, r }) => sum(albumLengths.slice(l, r))),
    );

    return part1 + part2;
  });
  private getPercentDone(progress: number): string {
    const maxProgress = this.maxProgress();
    return (100 * (progress / maxProgress)).toFixed(2);
  }

  /* Local storage */

  public saveToLocalStorage() {
    localStorage.setItem("version", "v1");
    localStorage.setItem("history", JSON.stringify(this.history()));
    localStorage.setItem("seed", this.seed().toString());
    localStorage.setItem("sortType", this.sortType().toString());
  }

  public loadFromLocalStorage() {
    const version = localStorage.getItem("version");
    if (version !== "v1" && version !== null) return;

    const savedHistory = localStorage.getItem("history");
    const seed = localStorage.getItem("seed");
    const sortType = localStorage.getItem("sortType");

    if (!savedHistory || !seed || !sortType) return;
    this.history.set(JSON.parse(savedHistory));
    this.seed.set(parseFloat(seed));
    this.sortType.set(sortType as SortType);
  }

  /* Local development */

  public fillHistory(): void {
    this.history.set(this.history().concat(new Array(1028).fill("left")));
  }
}
