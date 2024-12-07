import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Import your AuthService to get user info

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const expectedRoles = next.data['expectedRoles']; // Changed from .data.expectedRoles
    const userRole = this.authService.getUserRole(); // Get the user's role from AuthService

    if (expectedRoles && expectedRoles.indexOf(userRole) === -1) {
      // If the user's role is not in the expected roles, redirect to a different page
      this.router.navigate(['home']); // Change this to your desired route
      return false;
    }
    return true; // Allow access
  }
}