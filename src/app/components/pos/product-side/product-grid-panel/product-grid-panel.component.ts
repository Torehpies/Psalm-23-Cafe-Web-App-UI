import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { CommonModule } from '@angular/common';
import { Product} from '../../../../services/product.service';
import { RouterModule } from '@angular/router';
import { LineItem } from '../../../../models/lineItem/lineItem.model';
import { CategoryService } from '../../../../services/category.service';
import { OrderService } from '../../../../services/order.service';
import { QuantityPopupComponent } from '../../quantity-popup/quantity-popup.component';

@Component({
  selector: 'app-product-grid-panel',
  standalone: true,
  imports: [ProductItemComponent, CommonModule, RouterModule, QuantityPopupComponent],
  templateUrl: './product-grid-panel.component.html',
  styleUrl: './product-grid-panel.component.css'
})
export class ProductGridPanelComponent implements OnInit {

  private categoryService = inject(CategoryService)
  private orderService = inject(OrderService)

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProduct: Product | null = null;

  ngOnInit(): void {
    // this.saveProducts();
    // this.category = this.categoryPicker.selectedCategory
    this.loadProductsFromLocalStorage();
    this.categoryService.selectedCategory$.subscribe((category) => {
      this.filteredProducts = category
        ? this.products.filter((item) => item.Category === category)
        : this.products;
    });
  }

  loadProductsFromLocalStorage(): void {
    const productsData = localStorage.getItem('products');
    if (productsData) {
      this.products = JSON.parse(productsData) as Product[];
    }
  }

  onProductClicked(product: Product) {
    this.selectedProduct = product;
  }

  onCloseModal() {
    this.selectedProduct = null;
  }

  onLineItemConfirm(lineItem: LineItem) {
    this.orderService.addLineItem(lineItem);
    console.log(lineItem)
    this.selectedProduct = null;
  }
}
