import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import the Router service
import { AuthService } from '../auth/auth.service';  // Import AuthService

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add any other modules you need here
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
  providers: [AuthService],
})
export class CreateAccountComponent {

  fullName: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}
  // constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['..']);  
  }

  createAccount() {
    if (this.fullName && this.email && this.password && this.role) {
      this.authService.createAccount(this.fullName, this.email, this.password, this.role).subscribe({
        next: (response) => {
          console.log('Account created successfully:', response);
          this.errorMessage = null;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Account creation failed:', err);
          this.errorMessage ='There was an error creating your account. Please try again.';
        }
      });
    } else {
      this.errorMessage ='Please fill in all fields.';
    }
  }

}
