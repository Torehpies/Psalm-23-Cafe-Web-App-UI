import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { AuthResponse } from '../auth/response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router, /*private authService: AuthService*/) {}

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  redirect(event: Event) {
    event.preventDefault(); // Prevent default form submission
    // Here you can add logic to handle login (e.g., authentication)
    this.router.navigate(['/dashboard']); // Replace with your target route
  }
  /*onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (response: AuthResponse) => {
        console.log('Login successful:', response);
        this.errorMessage = null;
        // Ensure the redirect is correct
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed. Please try again.';
      }
    );
  }*/
}
