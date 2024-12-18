import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-reappeal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reappeal.component.html',
  styleUrls: ['./reappeal.component.css']
})
export default class ReappealComponent {
  reappealForm: FormGroup;
  errorMessage: string | null = null;
  router = inject(Router);

  showStatusModal = false;
  statusMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.reappealForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailValidator]]
    });

    this.reappealForm.get('email')?.valueChanges.subscribe(() => {
    });
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  }

  onSubmit() {
    if (this.reappealForm.valid) {
      this.authService.reappealService(this.reappealForm.value.email)
      .subscribe({
        next: (res) => {
          // Handle successful response
          this.showStatus('Reappeal request sent successfully');
          this.reappealForm.reset();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        }
      }
      );
    }
  }

  
  private showStatus(message: string): void {
    this.statusMessage = message;
    this.showStatusModal = true;
    setTimeout(() => {
      this.showStatusModal = false;
    }, 2000); // Hide the modal after 3 seconds
  }
}
