import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./app.component.html",
})
export class AppComponent {}
