import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PreventLoginAccessGuard implements CanActivate {
  constructor(private router: Router, private location: Location) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // Clear the browser's history to prevent going back to the login page
      this.location.replaceState('/dashboard');
      return false; // Prevent access to the login route
    }
    return true; // Allow access to the login page if not logged in
  }
}