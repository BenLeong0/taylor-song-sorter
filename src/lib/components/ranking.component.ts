import { SongResult } from "$lib/types";
import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-ranking",
  standalone: true,
  styleUrl: "./ranking.component.css",
  imports: [CommonModule],
  template: `
    <table>
      <tr class="row-header">
        <td>Rank</td>
        <td>Title</td>
      </tr>
      @for (song of songs; track song.title) {
        <tr>
          <td class="col-rank">{{ song.rank }}</td>
          <td>{{ song.title }}</td>
        </tr>
      }
    </table>
  `,
})
export class Ranking {
  @Input({ required: true }) public songs!: SongResult[];
}
