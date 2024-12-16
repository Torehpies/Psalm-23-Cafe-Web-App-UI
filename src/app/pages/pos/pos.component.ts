import { Component } from '@angular/core';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { OrderPanelComponent } from '../../components/pos/order-side/order-panel/order-panel.component';
import { ProductPanelComponent } from '../../components/pos/product-side/product-panel/product-panel.component';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [LeftsidebarComponent, HeaderComponent, OrderPanelComponent, ProductPanelComponent],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.css'
})
export default class PosComponent {
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;       
  });
  this.menuService.changeHeaderText('Point of Sale');
  }
}
