import { Component } from '@angular/core';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { OrderPanelComponent } from '../../components/pos/order-panel/order-panel.component';
import { ProductPanelComponent } from '../../components/pos/product-panel/product-panel.component';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [LeftsidebarComponent, HeaderComponent, OrderPanelComponent, ProductPanelComponent],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.css'
})
export default class PosComponent {
  isMenuActive: boolean = false;

  constructor() {}

  ngOnInit() {
    
  }
}
