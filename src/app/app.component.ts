import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  styleUrl: "./app.component.css",
  templateUrl: "./app.component.html",
})
export class AppComponent {}
