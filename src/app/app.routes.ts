import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PreventLoginAccessGuard } from './auth.guard'; // Adjust the path as needed

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
        import('./login/login.component').then((m) => m.LoginComponent),
        //canActivate: [PreventLoginAccessGuard], // Use the guard here
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
        canActivate: [PreventLoginAccessGuard], // Use the guard here
    },
    {
        path: 'inventory',
        loadComponent: () =>
            import('./inventory/inventory.component').then((m) => m.InventoryComponent),
    },
    {
        path: 'reports',
        loadComponent: () =>
            import('./reports/reports.component').then((m) => m.ReportsComponent),
    },
    {
        path: 'account-management',
        loadComponent: () =>
            import('./account-management/account-management.component').then((m) => m.AccountManagementComponent),
    },
    {
        path: 'account-monitoring',
        loadComponent: () =>
            import('./account-monitoring/account-monitoring.component').then((m) => m.AccountMonitoringComponent),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
