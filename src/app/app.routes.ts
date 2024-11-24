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
    {
        path:'inventory',
        loadComponent: () => {
            return import('./inventory/inventory.component').then((m) => m.InventoryComponent)
        },
    },
    {
        path:'reports',
        loadComponent: () => {
            return import('./reports/reports.component').then((m) => m.ReportsComponent)
        },
    },
    {
        path:'account-management',
        loadComponent: () => {
            return import('./account-management/account-management.component').then((m) => m.AccountManagementComponent)
        },
    },
    {
        path:'account-monitoring',
        loadComponent: () => {
            return import('./account-monitoring/account-monitoring.component').then((m) => m.AccountMonitoringComponent)
        },
    },
    {
        path:'product-management',
        loadComponent: () => {
            return import('./product-management/product-management.component').then((m) => m.ProductManagementComponent)
        },
    },
    {
        path:'supplies',
        loadComponent: () => {
            return import('./supplies/supplies.component').then((m) => m.SuppliesComponent)
        },
    },
    {
        path:'clock-in',
        loadComponent: () => {
            return import('./clock-in/clock-in.component').then((m) => m.ClockInComponent)
        },
    },
    {
        path:'production',
        loadComponent: () => {
            return import('./production/production.component').then((m) => m.ProductionComponent)
        },
    },
    {
        path:'scrapping',
        loadComponent: () => {
            return import('./scrapping/scrapping.component').then((m) => m.ScrappingComponent)
        },
    },
];
