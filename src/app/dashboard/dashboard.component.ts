import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { LeftsidebarComponent } from '../components/leftsidebar/leftsidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LeftsidebarComponent,HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
}
