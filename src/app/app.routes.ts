import { Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth.guard';
import { RoleGuardService } from './guards/role.guard';
import { ADMIN_ROLES, COUNTER_ROLES, PRODUCTION_ROLES } from './models/role/role.model';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/landing/landing.component') 
  },
  { 
    path: 'login', 
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
    path: 'reset', 
    loadComponent: () => import('./pages/resetpassword/resetpassword.component') 
  },
  { 
    path: 'reappeal', 
    loadComponent: () => import('./pages/reappeal/reappeal.component') 
  },
  { 
    path: 'home', 
    loadComponent: () => import('./pages/dashboard/dashboard.component'), 
    canActivate: [AuthGuardService] 
  },
  { 
    path: 'inventory', 
    loadComponent: () => import('./pages/inventory/inventory.component'), 
    canActivate: [AuthGuardService, RoleGuardService],  
    data: { expectedRoles: [...ADMIN_ROLES, ...PRODUCTION_ROLES] } 
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
    loadComponent: () => import('./pages/product-management/product-management.component'), 
    canActivate: [AuthGuardService, RoleGuardService],  
    data: { expectedRoles: ADMIN_ROLES}
  },
  { 
    path: 'pos', 
    loadComponent: () => import('./pages/pos/pos.component'), 
    canActivate: [AuthGuardService, RoleGuardService],  
     data: { expectedRoles: [...ADMIN_ROLES, ...COUNTER_ROLES]}
  },
  { 
    path: 'supplies', 
    loadComponent: () => import('./pages/supplies/supplies.component'), 
    canActivate: [AuthGuardService, RoleGuardService],  
     data: { expectedRoles: [...ADMIN_ROLES, ...PRODUCTION_ROLES]}
  },
  { 
    path: 'production', 
    loadComponent: () => import('./pages/production/production.component'), 
    canActivate: [AuthGuardService, RoleGuardService],  
     data: { expectedRoles: [...ADMIN_ROLES, ...PRODUCTION_ROLES]}
  },
  { 
    path: 'scrapping', 
    loadComponent: () => import('./pages/scrapping/scrapping.component'), 
    canActivate: [AuthGuardService, RoleGuardService],  
     data: { expectedRoles: [...ADMIN_ROLES, ...PRODUCTION_ROLES]}
  },
  { 
    path: 'clock-in', 
    loadComponent: () => import('./pages/clock-in/clock-in.component'), 
    canActivate: [AuthGuardService, RoleGuardService],  
     data: { expectedRoles: [...ADMIN_ROLES, ...COUNTER_ROLES, ...PRODUCTION_ROLES]}
     
  },
  { 
    path: 'reports',
    loadComponent: () => import('./pages/reports/reports.component'),
    canActivate: [AuthGuardService, RoleGuardService],
    data: { expectedRoles: ADMIN_ROLES },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/reports/charts/charts.component').then(m => m.ChartsComponent),
      },
      {
        path: 'transaction',
        loadComponent: () =>
          import('./pages/reports/transaction/transaction.component').then(m => m.TransactionComponent),
      },
      {
        path: 'product-performance',
        loadComponent: () =>
          import('./pages/reports/product-performance/product-performance.component').then(m => m.ProductPerformanceComponent),
      },
      {
        path: 'financial-reports',
        loadComponent: () =>
          import('./pages/reports/financial-reports/financial-reports.component').then(m => m.FinancialReportsComponent),
      },
      {
        path: 'hourly',
        loadComponent: () =>
          import('./pages/reports/charts/hourly/hourly.component').then(m => m.HourlyComponent),
      },
      {
        path: 'weekly',
        loadComponent: () =>
          import('./pages/reports/charts/weekly/weekly.component').then(m => m.WeeklyComponent),
      },
      {
        path: 'monthly',
        loadComponent: () =>
          import('./pages/reports/charts/monthly/monthly.component').then(m => m.MonthlyComponent),
      },
    ],
  },
  { 
    path: '**', 
    redirectTo: '' 
  },
];

