import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { AuthResponse } from '../auth/response.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService, private location: Location) {}

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      (response: AuthResponse) => {
        console.log('Login successful:', response);
        this.errorMessage = null;
        // Ensure the redirect is correct
        this.router.navigate(['/dashboard']);
        this.location.replaceState('/dashboard');
         return false; // Prevent access to the login route
      },
      (error: any) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed. Please try again.';
      }
    );
  }
}
