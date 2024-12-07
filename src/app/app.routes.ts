import { Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth.guard';
import { RoleGuardService } from './guards/role.guard';

const ADMIN_ROLES = ['manager', 'admin'];
const PRODUCTION_ROLES = ['baker', 'barista', 'helper'];
const COUNTER_ROLES = ['cashier', 'barista'];

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/login/login.component') 
  },
  { 
    path: 'create-account', 
    loadComponent: () => import('./pages/create-account/create-account.component') 
  },
  { 
    path: 'forgot-password', 
    loadComponent: () => import('./pages/forgot-password/forgot-password.component') 
  },
  { 
    path: 'reset/:token', 
    loadComponent: () => import('./pages/resetpassword/resetpassword.component') 
  },
  { 
    path: 'home', 
    loadComponent: () => import('./pages/dashboard/dashboard.component'), 
    canActivate: [AuthGuardService] 
  },
  { 
    path: 'inventory', 
    loadComponent: () => import('./pages/dashboard/dashboard.component'), 
    canActivate: [AuthGuardService, RoleGuardService],  
    data: { expectedRoles: ADMIN_ROLES, PRODUCTION_ROLES } 
  },
  { 
    path: 'reports', 
    loadComponent: () => import('./pages/dashboard/dashboard.component'), 
    canActivate: [AuthGuardService, RoleGuardService],  
    data: { expectedRoles: ADMIN_ROLES}
  },
  { 
    path: 'account-management', 
    loadComponent: () => import('./pages/account-management/account-management.component'), 
    canActivate: [AuthGuardService, RoleGuardService],  
    data: { expectedRoles: ADMIN_ROLES} 
  },
  { 
    path: 'account-monitoring', 
    loadComponent: () => import('./pages/account-monitoring/account-monitoring.component'), 
    canActivate: [AuthGuardService, RoleGuardService],  
    data: { expectedRoles: ADMIN_ROLES}
  },
  { 
    path: 'product-management', 
    loadComponent: () => import('./pages/dashboard/dashboard.component'), 
    canActivate: [AuthGuardService, RoleGuardService],  
    data: { expectedRoles: ADMIN_ROLES}
  },
  { 
    path: '**', 
    redirectTo: '' 
  },
];

/*
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
*/
