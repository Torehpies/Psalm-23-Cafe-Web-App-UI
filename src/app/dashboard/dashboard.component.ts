import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { LeftsidebarComponent } from '../components/leftsidebar/leftsidebar.component';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LeftsidebarComponent,HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
      this.menuService.isMenuActive$.subscribe((status) => {
          this.isMenuActive = status;   
      });
      this.menuService.changeHeaderText('Welcome, Admin!'); 
  }
}
