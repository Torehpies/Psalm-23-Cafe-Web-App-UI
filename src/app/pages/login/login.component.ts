import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';

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
  productService = inject(ProductService);
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
        localStorage.setItem('authToken', res.token);
        
        this.router.navigate(['home']);
        this.productService.saveProducts();
        this.loginForm.reset();
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    })
  }

  
}
