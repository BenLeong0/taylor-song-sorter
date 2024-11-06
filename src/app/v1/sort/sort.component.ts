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
import * as env from "$lib/env";
import { COLOURS, type SongEntry } from "../songs-v1";
import { SortingV1Service, type Selection } from "../sorting-v1.service";
import { PageContainerComponent } from "../shared/page-container/page-container.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-sort",
  standalone: true,
  imports: [CommonModule, Menu, PageContainerComponent, Ranking, Settings],
  templateUrl: "./sort.component.html",
})
export class SortComponent {
  protected readonly sortingService = inject(SortingV1Service);
  private readonly router = inject(Router);
  private readonly sanitiser = inject(DomSanitizer);

  protected readonly SHOW_RANDOM_RANKING_OPTION =
    env.SHOW_RANDOM_RANKING_OPTION;

  protected readonly COLOURS = COLOURS;

  protected readonly restartRequested = signal(false);

  public constructor() {
    this.sortingService.randomiseSeed();
    this.sortingService.loadFromLocalStorage();
    effect(() => this.sortingService.saveToLocalStorage());
    effect(() => this.redirectWhenComplete());
  }

  public readonly sortResult = computed(() => {
    const sortResult = this.sortingService.sortResult();
    return sortResult.complete ? null : sortResult;
  });

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

  /* Complete */

  private redirectWhenComplete(): void {
    const sortResult = this.sortingService.sortResult();
    if (sortResult.complete) {
      this.router.navigateByUrl("v1/results");
    }
  }

  /* Hotkeys */

  @HostListener("window:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
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
