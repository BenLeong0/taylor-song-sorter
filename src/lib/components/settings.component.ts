import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-settings",
    imports: [CommonModule],
    template: `
    <div class="text-16 text-center font-extrabold mb-5">ranking order</div>
    <div class="text-16 flex flex-row gap-[5px]">
      <div
        class="w-[150px] cursor-pointer select-none text-right hover:underline"
        (click)="byAlbum.emit()"
      >
        album by album
      </div>
      <div>|</div>
      <div
        class="w-[150px] cursor-pointer select-none text-left hover:underline"
        (click)="randomise.emit()"
      >
        randomised order
      </div>
    </div>
  `
})
export class Settings {
  @Output() public randomise = new EventEmitter<void>();
  @Output() public byAlbum = new EventEmitter<void>();
}
