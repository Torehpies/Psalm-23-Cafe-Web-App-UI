import { Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth.guard';
import { RoleGuardService } from './guards/role.guard';
import { ADMIN_ROLES, COUNTER_ROLES, PRODUCTION_ROLES } from './models/role/role.model';

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
    path: 'pos', 
    loadComponent: () => import('./pages/pos/pos.component'), 
    canActivate: [AuthGuardService],  
    // data: { expectedRoles: ADMIN_ROLES}
  },
  { 
    path: '**', 
    redirectTo: '' 
  },
];