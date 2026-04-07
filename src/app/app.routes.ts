import { Routes } from '@angular/router';
import { Login } from './features/pages/login/login';
import { authGuard } from './shared/components/guard/guard';

export const routes: Routes = [
    { path: "login", component: Login },
    {
        path: "",
        canActivate: [authGuard],

        loadComponent: () => import('./features/pages/main/main').then(m => m.Main),
        children: [
            {
                path: "category",
                loadChildren: () => import('./features/products/category/routes/category.routes').then(m => m.categoryRoutes)
            },
            {
                path: "measure",
                loadChildren: () => import('./features/products/measure/routes/measure.routes').then(m => m.measureRoutes)
            },
            {
                path: "home",
                redirectTo: "category/form",
                pathMatch: 'full'
            }
        ]
    },
    { path: "**", redirectTo: "login" }
];
