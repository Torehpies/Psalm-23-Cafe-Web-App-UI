import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, EditProductComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  @Input() product: any; // Ensure this input is properly passed from the parent
  @Output() visible = new EventEmitter<void>();

  showEdit: boolean = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    console.log('Product received:', this.product); // Debugging
  }

  toggleStatus() {
    if (!this.product || !this.product._id) {
      console.error('Product or Product ID not found'); // Debugging
      return;
    }

    this.product.status = this.product.status === 'Active' ? 'Inactive' : 'Active';
    console.log('Toggling status:', this.product.status); // Debugging

    this.productsService.updateProduct(this.product._id,this.product ).subscribe({
      next: (response) => {
        console.log('Backend response:', response); // Debugging
      },
      error: (error) => {
        console.error('Error updating product:', error); // Debugging
      }
    });
  }

  toggleEdit() {
    this.showEdit = !this.showEdit;
  }

  closeModal() {
    this.visible.emit();
  }
}
