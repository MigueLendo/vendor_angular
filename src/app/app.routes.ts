import { Routes } from '@angular/router';
import { authGuard } from './shared/components/guard/guard';
import { Login } from './login/login';
import { Unauthorized } from './unauthorized/unauthorized';
import { Main } from './main/main';
import { Home } from './main/home/home';

export const routes: Routes = [

    { path: "login", component: Login },

    { path: "unauthorized", component: Unauthorized },

    {
        path: "",
        component: Main,
        // canActivate: [authGuard],

        children: [
            {
                path: "home",
                component: Home
            },
            {
                path: "category",
                loadChildren: () => import('./main/products/category/routes/category.routes').then(m => m.categoryRoutes)
            },
            {
                path: "measure",
                loadChildren: () => import('./main/products/measure/routes/measure.routes').then(m => m.measureRoutes)
            },
            {
                path: "",
                redirectTo: "home",
                pathMatch: 'full'
            }
        ]
    },
    {
        path: "**",
        redirectTo: "login"
    }
];
