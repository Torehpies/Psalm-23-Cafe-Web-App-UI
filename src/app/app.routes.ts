import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        loadComponent: () => {
            return import('./login/login.component').then((m) => m.LoginComponent)
        },
    },
    {
        path:'dashboard',
        loadComponent: () => {
            return import('./dashboard/dashboard.component').then((m) => m.DashboardComponent)
        }
    },
];
