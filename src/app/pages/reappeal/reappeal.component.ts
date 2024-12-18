import { Component } from '@angular/core';
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

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.reappealForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailValidator]]
    });

    this.reappealForm.get('email')?.valueChanges.subscribe(() => {
      this.reappealForm.get('email')?.updateValueAndValidity();
    });
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  }

  onSubmit() {
    if (this.reappealForm.valid) {
      this.authService.reappealEmailService(this.reappealForm.value.email).subscribe(
        response => {
          // Handle successful response
          console.log('Reappeal email sent successfully', response);
        },
        error => {
          // Handle error response
          console.error('Error sending reappeal email', error);
        }
      );
    }
  }
}
