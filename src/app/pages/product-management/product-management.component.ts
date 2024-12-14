import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';
import { MenuService } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Product } from '../../models/product/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [HeaderComponent, LeftsidebarComponent,CommonModule, ProductFormComponent, ProductDetailComponent],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export default class ProductManagementComponent {
  isMenuActive: boolean = false;
  showProductForm: boolean = false;
  showProductDetail: boolean = false;
  products: Product[] = []; // Array to hold the products
  selectedProduct: any = null;

  constructor(private menuService: MenuService, private productsService: ProductsService) {}

  ngOnInit() {
      this.menuService.isMenuActive$.subscribe((status) => {
          this.isMenuActive = status;       
      });
      this.menuService.changeHeaderText('Product Management');

      this.refreshProducts();
  }

  toggleShowProductForm() {
      this.showProductForm = !this.showProductForm;
  }

  showProductDetails(product: Product) {
      this.selectedProduct = product;
      this.showProductDetail = true;
  }

  closeProductDetails() {
      this.showProductDetail = false;
      this.selectedProduct = null;
  }

  refreshProducts() {
      this.productsService.getProducts().subscribe({
          next: (response) => {
              console.log('Backend response (get products):', response);
              this.products = response.data;
          },
          error: (error) => {
              console.error('Error getting products:', error);
          }
     });
  }


  addProduct(product: Product) {
      console.log('Adding product to backend:', product);
      this.productsService.addProduct(product).subscribe(
          (response) => {
              console.log('Backend response (add product):', response);
              this.products.push(response);
          },
          (error) => {
              console.error('Error adding product:', error);
          }
      );
  }

  onProductAdded(newProduct: Product) {
    this.products.push(newProduct);
  }
  

}
