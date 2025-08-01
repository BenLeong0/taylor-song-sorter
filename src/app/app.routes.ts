import { Routes } from "@angular/router";
import { v1Routes } from "./v1/v1.routes";

export const LATEST_ROUTES = v1Routes;

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    children: LATEST_ROUTES,
  },
  {
    path: "v1",
    children: v1Routes,
  },
];
