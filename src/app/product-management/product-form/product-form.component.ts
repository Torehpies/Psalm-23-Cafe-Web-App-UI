import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../models/products.model';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmModalComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  @Output() productAdded = new EventEmitter<Products>();
  @Output() visible = new EventEmitter<void>();

  addProductForm: FormGroup;
  categories: string[] = ['Bread', 'Cake', 'Coffee', 'Milk Tea', 'Sides'];
  showModal: boolean = false;
  modalMessage: string = '';
  isSubmitAction: boolean = false;

  constructor(private fb: FormBuilder, private productsService: ProductsService) {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  toggleVisible() {
    this.visible.emit();
  }

  openCancelModal(): void {
    this.modalMessage = 'Are you sure you want to cancel? All changes will be lost.';
    this.isSubmitAction = false;
    this.showModal = true;
  }

  openSubmitModal(): void {
    this.modalMessage = 'Are you sure you want to submit this product?';
    this.isSubmitAction = true;
    this.showModal = true;
  }

  onSubmit(): void {
    this.openSubmitModal();
  }

  onConfirmed(isConfirmed: boolean): void {
    if (isConfirmed) {
      if (this.isSubmitAction) {
        if (this.addProductForm.valid) {
          const formData = this.addProductForm.value;

          const product: Products = {
            name: formData.name,
            Category: formData.category,
            price: formData.price,
            unit: 'Pieces',
            status: 'Inactive',
            currentStock: 0,
            par: 0,
          };
          this.productsService.addProduct(product).subscribe(
            (response) => {
              console.log('Product added:', response);
              this.productAdded.emit(response);
            },
            (error) => {
              console.error('Error adding product:', error);
            }
          );
        } else {
          console.log('Form is not valid!');
        }
      }
    }

    this.showModal = false;
    if (!this.isSubmitAction) {
      this.addProductForm.reset();
    }
    this.visible.emit();
  }

  onModalCancel(): void {
    this.showModal = false;
    this.addProductForm.reset();
  }
}
