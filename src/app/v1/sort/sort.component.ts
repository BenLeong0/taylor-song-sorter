import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { Component, HostListener, effect, inject, signal } from "@angular/core";

import { Menu } from "$lib/components/menu.component";
import { Ranking } from "$lib/components/ranking.component";
import { Settings } from "$lib/components/settings.component";
import * as env from "$lib/env";
import { COLOURS, type SongEntry } from "../songs-v1";
import { SortingV1Service, type Selection } from "../sorting-v1.service";

@Component({
  selector: "app-sort",
  imports: [CommonModule, Menu, Ranking, Settings],
  templateUrl: "./sort.component.html",
})
export class SortComponent {
  public log = console.log;

  protected readonly sortingService = inject(SortingV1Service);
  private readonly sanitiser = inject(DomSanitizer);

  protected readonly SHOW_RANDOM_RANKING_OPTION =
    env.SHOW_RANDOM_RANKING_OPTION;

  protected readonly COLOURS = COLOURS;

  protected readonly restartRequested = signal(false);
  protected readonly showSpotifyPlayer = signal(true);
  public toggleSpotifyPlayer() {
    this.showSpotifyPlayer.update((x) => !x);
  }

  public constructor() {
    this.sortingService.randomiseSeed();
    this.sortingService.loadFromLocalStorage();
    effect(() => this.sortingService.saveToLocalStorage());
  }

  /* Buttons */

  public selectOption(option: Selection): void {
    this.restartRequested.set(false);
    this.sortingService.selectOption(option);
  }

  public undo(): void {
    if (!this.sortingService.started()) return;
    this.restartRequested.set(false);
    this.sortingService.undo();
  }

  public requestRestart(): void {
    this.restartRequested.set(true);
  }

  public confirmRestart(): void {
    if (this.restartRequested() === false) {
      console.error("Restart attempted without confirmation");
      return;
    }
    this.restartRequested.set(false);
    this.sortingService.restart();
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

  /* Hotkeys */

  @HostListener("window:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.sortingService.sortResult().complete) return;

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
}
