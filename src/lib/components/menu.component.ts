import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output, model } from "@angular/core";

@Component({
    selector: "app-menu",
    imports: [CommonModule],
    template: `
    <div class="flex flex-row gap-[5px] text-16">
      <div
        class="w-[150px] cursor-pointer select-none text-right hover:underline"
        (click)="undo.emit()"
      >
        undo previous
      </div>
      <div>|</div>
      @if (restartRequested()) {
        <div
          class="w-[150px] cursor-pointer select-none text-left font-bold hover:underline"
          (click)="confirmRestart()"
        >
          are you sure?
        </div>
      } @else {
        <div
          class="w-[150px] cursor-pointer select-none text-left hover:underline"
          (click)="requestRestart()"
        >
          restart ranking
        </div>
      }
    </div>
  `
})
export class Menu {
  @Output() public undo = new EventEmitter<void>();
  @Output() public restart = new EventEmitter<void>();

  public readonly restartRequested = model<boolean>();

  public requestRestart(): void {
    this.restartRequested.set(true);
  }

  public confirmRestart(): void {
    this.restart.emit();
  }
}
