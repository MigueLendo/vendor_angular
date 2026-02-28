import { Routes } from "@angular/router";
import { measureDataResolver } from "./measure-data-resolver-list";

export const measureRoutes: Routes = [
    {
        path: "list",
        loadComponent: () => import('../measure-list/measure-list').then(m => m.MeasureList),
        resolve: {
            data: measureDataResolver
        }

    }



];