import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {}

  redirect(event: Event) {
    event.preventDefault(); // Prevent default form submission
    // Here you can add logic to handle login (e.g., authentication)
    this.router.navigate(['/dashboard']); // Replace with your target route
  }
}
