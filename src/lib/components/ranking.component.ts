import { SongResult } from "$lib/types";
import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";

@Component({
  selector: "app-ranking",
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="border-collapse text-16">
      <tr class="font-bold text-center">
        <td class="border border-black py-[4px] px-[6px]">Rank</td>
        <td class="border border-black py-[4px] px-[6px]">Title</td>
      </tr>
      @for (song of ranking(); track song.title) {
        <tr>
          <td class="border border-black py-[4px] px-[6px] text-center">
            {{ song.rank }}
          </td>
          <td class="border border-black py-[4px] px-[6px]">
            {{ song.title }}
          </td>
        </tr>
      }
    </table>
  `,
})
export class Ranking {
  public readonly ranking = input.required<SongResult[]>();
}
