import { Component, inject, OnInit } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../../services/product.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-grid-panel',
  standalone: true,
  imports: [ProductItemComponent, CommonModule, RouterModule],
  templateUrl: './product-grid-panel.component.html',
  styleUrl: './product-grid-panel.component.css'
})
export class ProductGridPanelComponent implements OnInit{

  private productService = inject(ProductService)
  products: Product[] = [];

  ngOnInit(): void {
    this.saveProducts();
  }

  saveProducts(){
    this.productService.getProducts()
    .subscribe({
      next:(res) => {
        localStorage.setItem('products', JSON.stringify(res.data));
        this.products = res.data
      },
      error: (err) => {
        console.log(err.errorMessage)
      }
    })
  }
}
