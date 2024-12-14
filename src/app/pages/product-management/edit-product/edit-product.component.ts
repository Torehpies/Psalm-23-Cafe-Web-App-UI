import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors,AbstractControl,ValidatorFn} from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product/product.model';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';
import { switchMap, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmModalComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  @Input() product: any;
  @Output() visible = new EventEmitter<void>();

  editProductForm: FormGroup;
  categories: string[] = ['Bread', 'Cake', 'Coffee', 'Milk Tea', 'Sides'];
  showModal: boolean = false;
  modalMessage: string = '';
  isSubmitAction: boolean = false;

  constructor(private fb: FormBuilder, private productsService: ProductsService) {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      sizes: this.fb.array([]) // Add sizes form array
    }, { validators: this.unchangedValidator() });
  }

  ngOnInit() {
    if (this.product) {
      this.editProductForm.patchValue({
        name: this.product.name,
        category: this.product.Category,
        price: this.product.price,
        sizes: this.product.sizes // Patch sizes
      });

      this.editProductForm.updateValueAndValidity();
      this.editProductForm.setErrors({ unchanged: true });

      this.editProductForm.valueChanges.subscribe(() => {
        this.checkForUnchangedValues();
      });
    }
    this.checkForUnchangedValues();
  }

  // Custom validator function
  unchangedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.product) {
        return null; // Return null if product is not defined
      }
      const formValue = control.value;
      const unchanged = formValue.name === this.product.name &&
                        formValue.category === this.product.Category &&
                        formValue.price === this.product.price;

      return unchanged ? { unchanged: true } : null;
    };
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
    this.modalMessage = 'Are you sure you want to update this product?';
    this.isSubmitAction = true;
    this.showModal = true;
  }

  onSubmit(): void {
    this.openSubmitModal();
  }

  checkForUnchangedValues() {
    if (!this.product) {
      return; // Return if product is not defined
    }
    const formValue = this.editProductForm.value;
    const unchanged = formValue.name === this.product.name &&
                      formValue.category === this.product.Category &&
                      formValue.price === this.product.price;

    if (unchanged) {
      this.editProductForm.setErrors({ unchanged: true });
    } else {
      this.editProductForm.setErrors(null);
    }
  }

  private isFormDirtyButUnchanged(): boolean {
    return this.editProductForm.errors?.['unchanged'] || false;
  }

  onConfirmed(isConfirmed: boolean): void {
    if (isConfirmed) {
      if (this.isSubmitAction) {
        if (this.isFormDirtyButUnchanged()) {
          console.log('Form is dirty but unchanged.');
        }
        if (this.editProductForm.valid) {
          const formData = this.editProductForm.value;

          const updatedProduct: Partial<Product> = {
            name: formData.name,
            category: formData.category,
            price: formData.price,
          };
          this.productsService.updateProduct(this.product._id, updatedProduct).subscribe(
            (response) => {
              console.log('Product updated:', response);
              this.visible.emit();
            },
            (error) => {
              console.error('Error updating product:', error);
            }
          );
        } else {
          console.log('Form is not valid!');
        }
      }
    }

    this.showModal = false;
    if (!this.isSubmitAction) {
      this.editProductForm.reset();
      this.visible.emit();
      return;
    }
    this.visible.emit();
    this.reloadPage();
  }

  reloadPage() {
    window.location.reload();
  }

  onModalCancel(): void {
    this.showModal = false;
  }
}
