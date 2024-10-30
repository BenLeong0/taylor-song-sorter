import { Routes } from "@angular/router";

export const LATEST_VERSION = "v1";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: LATEST_VERSION,
  },
  {
    path: "v1",
    loadChildren: () => import("./v1/v1.routes").then((m) => m.v1Routes),
  },
];
