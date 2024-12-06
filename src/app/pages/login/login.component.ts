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
  errorMessage: string | null = null;

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
    }
    
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  login(){
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res) => {
        this.authService.setToken(res.token);
        this.router.navigate(['home']);
        this.loginForm.reset();
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    })
  }
}
