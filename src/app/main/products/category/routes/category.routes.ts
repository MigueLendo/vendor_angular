import { Routes } from '@angular/router';
import { categoryResolver } from './category-data-resolver';
import { categoryDataResolverList } from './category-data-resolver-list';


export const categoryRoutes: Routes = [
    {
        path: "form",
        loadComponent: () => import('../category').then(m => m.Category)
    },
    {
        path: "list",
        loadComponent: () => import('../category-list/category-list').then(m => m.CategoryList),
        resolve: {
            data: categoryDataResolverList
        }
    },
    {
        path: "form/:id",
        loadComponent: () => import('../category').then(m => m.Category),
        resolve: {
            data: categoryResolver
        }
    },
];

