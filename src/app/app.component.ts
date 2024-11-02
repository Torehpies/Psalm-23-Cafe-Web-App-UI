import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./login/login.component.css'],
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'My Angular App';
}
