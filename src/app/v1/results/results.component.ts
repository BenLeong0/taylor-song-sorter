import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
  signal,
} from "@angular/core";
import { Router } from "@angular/router";
import { SortingV1Service } from "../sorting-v1.service";
import { CommonModule } from "@angular/common";
import { Menu } from "$lib/components/menu.component";
import { PageContainerComponent } from "../shared/page-container/page-container.component";
import { Ranking } from "$lib/components/ranking.component";
import { Settings } from "$lib/components/settings.component";

@Component({
  selector: "app-results",
  standalone: true,
  imports: [CommonModule, Menu, PageContainerComponent, Ranking, Settings],
  templateUrl: "./results.component.html",
})
export class ResultsComponent {
  public router = inject(Router);
  public sortingService = inject(SortingV1Service);

  protected readonly restartRequested = signal(false);

  public constructor() {
    this.sortingService.loadFromLocalStorage();
    effect(() => this.sortingService.saveToLocalStorage());
    effect(() => this.redirectIfIncomplete());
  }

  public readonly sortResult = computed(() => {
    const sortResult = this.sortingService.sortResult();
    return sortResult.complete ? sortResult : null;
  });

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

  /* Complete */

  private redirectIfIncomplete(): void {
    const sortResult = this.sortingService.sortResult();
    if (!sortResult.complete) {
      this.router.navigateByUrl("v1");
    }
  }

  /* Hotkeys */

  @HostListener("window:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    // if (this.sortingService.sortResult().complete) return;

    const actions: Record<string, VoidFunction> = {
      Backspace: () => this.undo(),
    } as const;
    const action = actions[event.key];
    action && action();
  }
}
