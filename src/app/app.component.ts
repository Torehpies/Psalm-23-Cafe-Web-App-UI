import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component'; // Adjust the path accordingly

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './login/login.component.html',
  styleUrls: ['./login/login.component.css'], // Ensure this path is correct
  imports: [LoginComponent]
})
export class AppComponent {
  title = 'My Angular App'; // Example property
}
