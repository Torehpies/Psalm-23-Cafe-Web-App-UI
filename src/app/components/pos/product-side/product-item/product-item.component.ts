import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../services/product.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input({ required: true }) product!: Product;
  @Output() productClicked = new EventEmitter<Product>();

  onClick() {
    // console.log("clicked");
    this.productClicked.emit(this.product);
  }
}
