import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: "home",
        redirectTo: "/category/form"
    },
    {
        path: "category",
        loadChildren: () => import('./features/products/category/routes/category.routes').then(m => m.categoryRoutes)
    },
    {
        path: "measure",
        loadChildren: () => import('./features/products/measure/routes/measure.routes').then(m => m.measureRoutes)
    },
    {
        path: "group",
        loadChildren: () => import('./features/products/measure/routes/measure.routes').then(m => m.measureRoutes)
    }
];

