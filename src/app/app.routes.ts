import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
      path:'',
      pathMatch:'full',
      loadComponent: () => {
          return import('./login/login.component').then((m) => m.LoginComponent)
      },
  },
  {
      path:'verify-code',
      loadComponent: () => {
          return import('./verification/verification.component').then((m) => m.VerificationComponent)
      }
  },
  {
    path:'create-account',
    loadComponent: () => {
        return import('./create-account/create-account.component').then((m) => m.CreateAccountComponent)
    }
    },
  {
    path:'forgot-password',
    loadComponent: () => {
        return import('./forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent)
    }
},
{
    path:'resetpassword',
    loadComponent: () => {
        return import('./resetpassword/resetpassword.component').then((m) => m.ResetPasswordComponent)
    }
},
    {
        path: 'dashboard',
        loadComponent: () => {
            return import('./dashboard/dashboard.component').then((m) => m.DashboardComponent);
        },
    },
    {
        path: 'inventory',
        loadComponent: () => {
            return import('./inventory/inventory.component').then((m) => m.InventoryComponent);
        },
    },
    {
        path: 'reports',
        loadComponent: () => {
            return import('./reports/reports.component').then((m) => m.ReportsComponent);
        },
    },
    {
        path: 'account-management',
        loadComponent: () => {
            return import('./account-management/account-management.component').then((m) => m.AccountManagementComponent);
        },
    },
    {
        path: 'account-management/update',
        loadComponent: () => {
            return import('./account-management/update/update.component').then((m) => m.AccountManagementUpdateComponent);
        },
    },
    {
        path: 'account-monitoring',
        loadComponent: () => {
            return import('./account-monitoring/account-monitoring.component').then((m) => m.AccountMonitoringComponent);
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

