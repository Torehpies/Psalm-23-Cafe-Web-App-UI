import { Component } from '@angular/core';
import { CategoryPanelComponent } from '../category-panel/category-panel.component';
import { ProductGridPanelComponent } from '../product-grid-panel/product-grid-panel.component';

@Component({
  selector: 'app-product-panel',
  standalone: true,
  imports: [CategoryPanelComponent, ProductGridPanelComponent],
  templateUrl: './product-panel.component.html',
  styleUrl: './product-panel.component.css'
})
export class ProductPanelComponent {

}
