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
      path:'verification',
      loadComponent: () => {
          return import('./verification/verification.component').then((m) => m.VerificationComponent)
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
];  

