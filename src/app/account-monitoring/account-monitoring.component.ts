import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { LeftsidebarComponent } from '../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-account-monitoring',
  standalone: true,
  imports: [LeftsidebarComponent, HeaderComponent],
  templateUrl: './account-monitoring.component.html',
  styleUrl: './account-monitoring.component.css'
})
export class AccountMonitoringComponent {
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
      this.menuService.isMenuActive$.subscribe((status) => {
          this.isMenuActive = status;    
      });
      this.menuService.changeHeaderText('Account Monitoring'); 
  }
}
