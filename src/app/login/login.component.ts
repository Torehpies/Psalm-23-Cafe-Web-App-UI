import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../auth/auth.service'; 
import { AuthResponse } from '../auth/response.model'; 
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' 
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  // constructor(private router: Router, private authService: AuthService) {
  //   console.log('LoginComponent initialized');
  // }   
  constructor(private router: Router) {}  //swap if BE endpoint for login is okay  
  

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  //uncommet if BE endpoint for login is okay
  // onLogin() {
  //   this.authService.login(this.username, this.password).subscribe(
  //     (response: AuthResponse) => {
  //       console.log('Login successful:', response);
  //       this.errorMessage = null;
  //       this.router.navigate(['/dashboard']);
  //     },
  //     (error: any) => {
  //       console.error('Login failed:', error);
  //       this.errorMessage = 'Login failed. Please try again.';
  //     }
  //   );
  // } 
}

