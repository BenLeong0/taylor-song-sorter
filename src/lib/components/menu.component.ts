import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Output,
  ModelSignal,
  signal,
  model,
} from "@angular/core";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="menu-options">
      <div class="menu-option" style="text-align: right" (click)="undo.emit()">
        undo previous
      </div>
      <div>|</div>
      @if (restartRequested()) {
        <div
          class="menu-option"
          style="font-weight: bold"
          (click)="confirmRestart()"
        >
          are you sure?
        </div>
      } @else {
        <div
          class="menu-option"
          style="text-align: left"
          (click)="requestRestart()"
        >
          restart ranking
        </div>
      }
    </div>
  `,
})
export class Menu {
  @Output() public undo = new EventEmitter<void>();
  @Output() public restart = new EventEmitter<void>();

  public readonly restartRequested = model<boolean>();

  public requestRestart(): void {
    this.restartRequested.set(true);
  }

  public confirmRestart(): void {
    this.restartRequested.set(false);
    this.restart.emit();
  }
}
