import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { LeftsidebarComponent } from '../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [LeftsidebarComponent, HeaderComponent],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.css'
})
export class AccountManagementComponent {
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
      this.menuService.isMenuActive$.subscribe((status) => {
          this.isMenuActive = status;     
      });
      this.menuService.changeHeaderText('Account Management');
  }
}
