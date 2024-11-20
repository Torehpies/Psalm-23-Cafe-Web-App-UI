import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
  providers: [AuthService],
})
export class CreateAccountComponent {
  firstName: string = '';   
  lastName: string = '';  
  email: string = '';       
  password: string = '';    
  role: string = '';      
  errorMessage: string | null = null;
  
  isPromptVisible: boolean = false; 

  constructor(private router: Router, private authService: AuthService) {}

  goBack() {
    this.router.navigate(['..']);
  }

  showPopup() {
    this.isPromptVisible = true;
  }

  closePopup() {
    this.isPromptVisible = false;
  }

  confirmSubmit() {
    if (this.firstName && this.lastName && this.email && this.password && this.role) {
      this.authService.createAccount(this.firstName, this.lastName, this.email, this.password, this.role).subscribe({
        next: (response) => {
          console.log('Account created successfully:', response);
          this.errorMessage = null;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Account creation failed:', err);
          this.errorMessage = 'There was an error creating your account. Please try again.';
        }
      });

      this.closePopup();
    } else {
      this.errorMessage = 'Please fill in all fields.';
    }
  }

  togglePasswordVisibility(event: Event) {
    const inputField = (event.target as HTMLElement).previousElementSibling as HTMLInputElement;
    inputField.type = inputField.type === 'password' ? 'text' : 'password';
  }
}
