import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product/product.model';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';
import { switchMap, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmModalComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  @Output() productAdded = new EventEmitter<Product>();
  @Output() visible = new EventEmitter<void>();

  addProductForm: FormGroup;
  categories: string[] = ['Bread', 'Cake', 'Coffee', 'Milk Tea', 'Sides'];
  showModal: boolean = false;
  modalMessage: string = '';
  isSubmitAction: boolean = false;
  isDuplicateProduct: boolean = false; // New flag for duplicate product validation

  constructor(private fb: FormBuilder, private productsService: ProductsService) {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });

     // Listen for changes to the name and category fields for instant duplicate validation
     this.addProductForm.valueChanges
     .pipe(
       debounceTime(100), // Add debounce time to delay validation
       switchMap(() => this.checkForDuplicateProduct())
     )
     .subscribe();
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

  checkForDuplicateProduct() {
    const formData = this.addProductForm.value;
    if (formData.name && formData.category) {
      return this.productsService.getProducts().pipe(
        switchMap((response) => {
          const products: Product[] = response.data; // Adjust to match the response type
          console.log('Products:', products);
          const inputName = formData.name.toLowerCase();
          const inputCategory = formData.category.toLowerCase();
          this.isDuplicateProduct = products.some(product => 
            product.name.toLowerCase() === inputName && product.category.toLowerCase() === inputCategory
          );
          if (this.isDuplicateProduct) {
            this.addProductForm.setErrors({ duplicate: true }); // Mark form as invalid
          } else {
            this.addProductForm.setErrors(null); // Clear duplicate error if no duplicate found
          }
          return of([]);
        })
      );
    }
    return of([]);
  }

  onSubmit(): void {
    if (this.addProductForm.invalid) {
      console.log('Form is invalid!');
      return;
    }
    this.openSubmitModal();
  }

  onConfirmed(isConfirmed: boolean): void {
    if (isConfirmed) {
      if (this.isSubmitAction) {
        if (this.addProductForm.valid) {
          const formData = this.addProductForm.value;

          const product: Product = {
            name: formData.name,
            category: formData.category,
            price: formData.price,
            unit: 'Pieces',
            status: 'Inactive',
            currentStock: 0,
            par: 0,
            sizes: []
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
    this.reloadPage();
  }

  reloadPage() {
    window.location.reload();
  }

  onModalCancel(): void {
    this.showModal = false;
    this.addProductForm.reset();
  }
}
