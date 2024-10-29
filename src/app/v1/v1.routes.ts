import { Routes } from "@angular/router";
import { SortComponent } from "./sort/sort.component";
import { ResultsComponent } from "./results/results.component";
import { ShareComponent } from "./share/share.component";

export const v1Routes: Routes = [
  {
    path: "",
    component: SortComponent,
  },
  {
    path: "results",
    component: ResultsComponent,
  },
  {
    path: "share/:rankingId",
    component: ShareComponent,
  },
];
