import { Routes } from "@angular/router";
import { measureDataResolverList } from "./measure-data-resolver-list";
import { measureResolver } from "./measure-data-resolver";

export const measureRoutes: Routes = [
    {
        path: "form",
        loadComponent: () => import('../measure-form/measure-form').then(m => m.MeasureForm),

    },

    {
        path: "list",
        loadComponent: () => import('../measure-list/measure-list').then(m => m.MeasureList),
        resolve: {
            data: measureDataResolverList
        }

    },

    {
        path: "form/:id",
        loadComponent: () => import('../measure-form/measure-form').then(m => m.MeasureForm),
        resolve: {
            data: measureResolver
        }
    }



];