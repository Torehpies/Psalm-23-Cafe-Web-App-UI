import { Routes } from '@angular/router';

export const routes: Routes = [
  // Login route
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },

  // Verification routes
  {
    path: 'verify-code',
    loadComponent: () =>
      import('./verification/verification.component').then(m => m.VerificationComponent),
  },
  {
    path: 'create-account',
    loadComponent: () =>
      import('./create-account/create-account.component').then(m => m.CreateAccountComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
  },
  {
    path: 'resetpassword',
    loadComponent: () =>
      import('./resetpassword/resetpassword.component').then(m => m.ResetPasswordComponent),
  },

  // Dashboard
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
  },

  // Inventory
  {
    path: 'inventory',
    loadComponent: () =>
      import('./inventory/inventory.component').then(m => m.InventoryComponent),
  },

  // Reports with child routes
  {
    path: 'reports',
    loadComponent: () =>
      import('./reports/reports.component').then(m => m.ReportsComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'hourly', // Default child route
      },
      {
        path: 'transaction',
        loadComponent: () =>
          import('./reports/transaction/transaction.component').then(m => m.TransactionComponent),
      },
      {
        path: 'product-performance',
        loadComponent: () =>
          import('./reports/product-performance/product-performance.component').then(m => m.ProductPerformanceComponent),
      },
      {
        path: 'financial-reports',
        loadComponent: () =>
          import('./reports/financial-reports/financial-reports.component').then(m => m.FinancialReportsComponent),
      },
      {
        path: 'hourly',
        loadComponent: () =>
          import('./reports/charts/hourly/hourly.component').then(m => m.HourlyComponent),
      },
      {
        path: 'weekly',
        loadComponent: () =>
          import('./reports/charts/weekly/weekly.component').then(m => m.WeeklyComponent),
      },
      {
        path: 'monthly',
        loadComponent: () =>
          import('./reports/charts/monthly/monthly.component').then(m => m.MonthlyComponent),
      },
    ],
  },

  // Account Management
  {
    path: 'account-management',
    loadComponent: () =>
      import('./account-management/account-management.component').then(m => m.AccountManagementComponent),
  },
  {
    path: 'account-management/update',
    loadComponent: () =>
      import('./account-management/update/update.component').then(m => m.AccountManagementUpdateComponent),
  },

  // Account Monitoring
  {
    path: 'account-monitoring',
    loadComponent: () =>
      import('./account-monitoring/account-monitoring.component').then(m => m.AccountMonitoringComponent),
  },

  // Product Management
  {
    path: 'product-management',
    loadComponent: () =>
      import('./product-management/product-management.component').then(m => m.ProductManagementComponent),
  },

  // Supplies
  {
    path: 'supplies',
    loadComponent: () =>
      import('./supplies/supplies.component').then(m => m.SuppliesComponent),
  },

  // Clock-In
  {
    path: 'clock-in',
    loadComponent: () =>
      import('./clock-in/clock-in.component').then(m => m.ClockInComponent),
  },

  // Production
  {
    path: 'production',
    loadComponent: () =>
      import('./production/production.component').then(m => m.ProductionComponent),
  },

  // Scrapping
  {
    path: 'scrapping',
    loadComponent: () =>
      import('./scrapping/scrapping.component').then(m => m.ScrappingComponent),
  },
];
