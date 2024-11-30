import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService],
})
export default class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm !: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  login(){
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res) => {
      this.router.navigate(['home'])
      },
      error:(err) => {

      }
    })
  }
  /*
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  //constructor(private router: Router, private authService: AuthService) {}


  constructor(private router: Router, private authService: AuthService) {
    console.log('LoginComponent initialized');
  }
  // constructor(private router: Router) {}  //swap if BE endpoint for login is okay

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  // redirect(event: Event) {
  //   event.preventDefault(); // Prevent default form submission
  //   // Here you can add logic to handle login (e.g., authentication)
  //   this.router.navigate(['/dashboard']); // Replace with your target route
  // }
  // onLogin() {


  navigateToCreateAccount() {
    this.router.navigate(['/create-account']);  // Update to your actual signup route
  }

  //uncommet if BE endpoint for login is okay
  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      (response: AuthResponse) => {
        console.log('Login successful:', response);
        this.errorMessage = null;
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed. Please try again.';
      }
    );

  }
  */
}
