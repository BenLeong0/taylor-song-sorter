import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="menu-options">
      <div
        class="menu-option"
        style="text-align: right"
        (click)="byAlbum.emit()"
      >
        by album
      </div>
      <div>|</div>
      <div
        class="menu-option"
        style="text-align: left"
        (click)="randomise.emit()"
      >
        random order
      </div>
    </div>
  `,
})
export class Settings {
  @Output() public randomise = new EventEmitter<void>();
  @Output() public byAlbum = new EventEmitter<void>();
}
