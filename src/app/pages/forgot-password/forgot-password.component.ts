import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [AuthService],
})

export default class ForgotPasswordComponent implements OnInit{
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  forgotPasswordForm !: FormGroup;
  router = inject(Router);
  errorMessage: string | null = null;
  successMessage: string | null = null;

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  submit(){
    this.authService.sendEmailService(this.forgotPasswordForm.value.email)
    .subscribe({
      next: (res) => {
        alert(res.message);
        this.forgotPasswordForm.reset();
        this.errorMessage = null;
        this.successMessage = "Email sent successfully";
      },
      error: (err) => {
        this.successMessage = null;
        this.errorMessage = err.error.message;
      }
    })
  }

}

