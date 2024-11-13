// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth/auth.service'; 
// import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http'; 

// @Component({
//   selector: 'app-verification',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule,HttpClientModule],
//   templateUrl: './verification.component.html',
//   styleUrl: './verification.component.css'
// })  
// export class VerificationComponent {
//   verificationForm: FormGroup;
//   email: string = '';
//   constructor(
//     private router: Router,
//     private authService: AuthService,
//     private fb: FormBuilder
//   ) {
//     // Retrieve email from navigation state
//     const navigation = this.router.getCurrentNavigation();
//     this.email = navigation?.extras.state?.['email'] || '';  // Default to empty string if not found

//     // Initialize the form with default values
//     this.verificationForm = this.fb.group({
//       code1: ['', [Validators.required, Validators.pattern('[0-9]')]],
//       code2: ['', [Validators.required, Validators.pattern('[0-9]')]],
//       code3: ['', [Validators.required, Validators.pattern('[0-9]')]],
//       code4: ['', [Validators.required, Validators.pattern('[0-9]')]],
//       code5: ['', [Validators.required, Validators.pattern('[0-9]')]],
//       code6: ['', [Validators.required, Validators.pattern('[0-9]')]],
//     });
//   }

//   // Method to handle form submission and verify code
//   onSubmit() {
//     const code = [
//       this.verificationForm.value.code1,
//       this.verificationForm.value.code2,
//       this.verificationForm.value.code3,
//       this.verificationForm.value.code4,
//       this.verificationForm.value.code5,
//       this.verificationForm.value.code6
//     ].join('');  // Combine the 6 code inputs into one string

//     // Call the verifyCode method from the AuthService
//     this.authService.verifyCode(this.email, code).subscribe({
//       next: () => {
//         console.log("Code verified successfully, navigating to reset password...");
//         this.router.navigate(['/resetpassword'], { state: { email: this.email } });  // Navigate to the reset password page
//       },
//       error: (error) => {
//         console.error("Verification failed:", error);
//         alert("Verification failed. Please check the code and try again.");
//       }
//     });
//   }

//   // Method to resend verification code
//   reSendVerification() {
//     if (!this.email) {
//       alert("Email is missing. Please try again.");
//       return;
//     }

//     // Call the resendVerificationCode method from the AuthService
//     this.authService.resendVerificationCode(this.email).subscribe({
//       next: () => {
//         console.log("Verification code resent successfully.");
//         alert("A new verification code has been sent to your email.");
//       },
//       error: (error) => {
//         console.error("Failed to resend verification code:", error);
//         alert("Failed to resend verification code. Please try again.");
//       }
//     });
//   }

// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})  
export class VerificationComponent {
  constructor(
    private router: Router ) {}

    onSubmit() {
      this.router.navigate(['/resetpassword']);
    }
}

