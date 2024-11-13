// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-forgot-password',
//   standalone: true,
//   imports: [],
//   templateUrl: './forgot-password.component.html',
//   styleUrl: './forgot-password.component.css'
// })
// export class ForgotPasswordComponent {

//   // constructor(private router: Router, private authService: AuthService) {
//   // }   
//   constructor(private router: Router) {}

//   onSubmit() {
//     this.router.navigate(['/verification']);
//   }


// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule

@Component({
  selector: 'app-forgot-password',
  standalone: true,  // Mark as a standalone component
  imports: [FormsModule, HttpClientModule],  // Add HttpClientModule here to make it available to this component
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';  // Store the email input
  errorMessage: string | null = null;  // To store any error message

  constructor(private router: Router) {}
  // constructor(private router: Router, private authService: AuthService) {}

  // //The actual method for handling forgot password
  // onForgotPassword() {
  //   this.authService.forgotPassword(this.email).subscribe(
  //     (response) => {
  //       console.log('Password reset email sent successfully:', response);
  //       this.errorMessage = null;
  //       this.router.navigate(['/verification']);  // Redirect to verification page
  //     },
  //     (error: any) => {
  //       console.error('Forgot password request failed:', error);
  //       this.errorMessage = 'Failed to request password reset. Please try again.';  // Show error message
  //     }
  //   );
  // }
  goBack() {
    this.router.navigate(['..']);  // Go back to previous page
  }
  onSubmit() {
    this.router.navigate(['//verify-code'], { state: { email: this.email } });
  }
}

