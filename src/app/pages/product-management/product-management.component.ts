import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { LeftsidebarComponent } from '../components/leftsidebar/leftsidebar.component';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [HeaderComponent, LeftsidebarComponent],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent {
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
      this.menuService.isMenuActive$.subscribe((status) => {
          this.isMenuActive = status;       
      });
      this.menuService.changeHeaderText('Product Management');
  }
}
