// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-reset-password',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './resetpassword.component.html',
//   styleUrls: ['./resetpassword.component.css']
// })
// export class ResetPasswordComponent {
//   password: string = '';
//   confirmPassword: string = '';
//   isPromptVisible: boolean = false;

//   constructor(private router: Router) {}

//   onSubmit() {
//     this.openPopup();
//   }

//   openPopup() {
//     this.isPromptVisible = true;
//   }

//   closePopup() {
//     this.isPromptVisible = false;
//   }

//   confirmReset() {
//     if (this.password === this.confirmPassword) {
//       console.log('Password reset confirmed!');
//       this.isPromptVisible = false;
//     } else {
//       console.log('Passwords do not match!');
//       this.isPromptVisible = false;
//     }
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
  providers: [AuthService],
})

export default class ResetPasswordComponent{
  resetForm!: FormGroup;

  reset(){

  }
}

/*
export class ResetPasswordComponent {
  email: string = '';  // Add email field
  password: string = '';
  confirmPassword: string = '';
  isPromptVisible: boolean = false;
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  // Submit handler
  onSubmit() {
    if (this.password === this.confirmPassword) {
      this.resetPassword();  // Call reset password when passwords match
    } else {
      this.errorMessage = 'Passwords do not match!';
    }
  }

  // Method to call the reset password API
  resetPassword() {
    this.authService.resetPassword(this.email, this.password).subscribe(
      (response) => {
        console.log('Password reset successfully:', response);
        this.router.navigate(['/login']);  // Redirect to login page after successful reset
      },
      (error) => {
        console.error('Reset password failed:', error);
        this.errorMessage = 'Failed to reset password. Please try again.';  // Show error message
      }
    );
  }

  openPopup() {
    this.isPromptVisible = true;
  }

  closePopup() {
    this.isPromptVisible = false;
  }

  confirmReset() {
    this.onSubmit();  // Call onSubmit when user confirms the reset in the popup
  }
  */
