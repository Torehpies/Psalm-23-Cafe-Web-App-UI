import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetPasswordComponent {
  password: string = '';
  confirmPassword: string = '';
  isPromptVisible: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    this.openPopup();
  }

  openPopup() {
    this.isPromptVisible = true;
  }

  closePopup() {
    this.isPromptVisible = false;
  }

  confirmReset() {
    if (this.password === this.confirmPassword) {
      console.log('Password reset confirmed!');
      this.isPromptVisible = false;
    } else {
      console.log('Passwords do not match!');
      this.isPromptVisible = false;
    }
  }
}
