import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export default class LandingComponent {
  router = inject(Router);

  navigateToLogin() {
    this.router.navigate(['login']);
  }
}
