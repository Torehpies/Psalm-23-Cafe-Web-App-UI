import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Product, Size } from '../../../models/product/product.model';
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
  categories: string[] = ['Bread', 'Cake', 'Coffee', 'Milk Tea', 'Others'];
  showModal: boolean = false;
  modalMessage: string = '';
  isSubmitAction: boolean = false;
  selectedCategory: string = '';

  constructor(private fb: FormBuilder, private productsService: ProductsService) {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      unit: [''],
      sizes: this.fb.array([]) // Add sizes form array
    }, { validators: this.unchangedValidator() });

    this.editProductForm.get('category')?.valueChanges.subscribe(category => {
      this.selectedCategory = category;
      this.updateFormForCategory(category);
    });
  }

  ngOnInit() {
    if (this.product) {
      this.editProductForm.patchValue({
        name: this.product.name,
        category: this.product.category,
        price: this.product.price,
        unit: this.product.unit
      });

      this.product.sizes.forEach((size: any) => {
        this.sizes.push(this.fb.group({
          size: [size.size, Validators.required],
          price: [size.price, [Validators.required, Validators.min(0)]]
        }));
      });

      this.editProductForm.updateValueAndValidity();
      this.editProductForm.setErrors({ unchanged: true });
      this.editProductForm.valueChanges.subscribe(() => {
        this.checkForUnchangedValues();
      });

      if (this.product.category === 'Coffee' || this.product.category === 'Milk Tea') {
        this.editProductForm.get('unit')?.setValue('cup');
      }
    }
    this.checkForUnchangedValues();
  }

  updateFormForCategory(category: string) {
    if (category === 'Bread') {
      this.editProductForm.get('unit')?.setValidators(Validators.required);
      this.editProductForm.get('price')?.clearValidators();
    } else if (category === 'Cake') {
      this.editProductForm.get('unit')?.setValue('whole');
      this.editProductForm.get('unit')?.clearValidators();
      this.editProductForm.get('price')?.setValidators([Validators.required, Validators.min(0)]);
    } else if (category === 'Coffee' || category === 'Milk Tea') {
      this.editProductForm.get('unit')?.setValue('cup');
      this.editProductForm.get('unit')?.clearValidators();
      this.editProductForm.get('price')?.clearValidators();
      this.editProductForm.setControl('sizes', this.fb.array([]));
    } else if (category === 'Others') {
      this.editProductForm.get('unit')?.clearValidators();
      this.editProductForm.get('price')?.setValidators([Validators.required, Validators.min(0)]);
    }
    this.editProductForm.get('unit')?.updateValueAndValidity();
    this.editProductForm.get('price')?.updateValueAndValidity();
  }

  // Custom validator function
  unchangedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.product) {
        return null; // Return null if product is not defined
      }
      const formValue = control.value;
      const unchanged = formValue.name === this.product.name &&
                        formValue.category === this.product.category &&
                        formValue.price === this.product.price &&
                        formValue.unit === this.product.unit &&
                        this.areSizesEqual(formValue.sizes, this.product.sizes);
      return unchanged ? { unchanged: true } : null;
    };
  }

  areSizesEqual(sizes1: Size[], sizes2: Size[]): boolean {
    if (sizes1.length !== sizes2.length) {
      return false;
    }
    for (let i = 0; i < sizes1.length; i++) {
      if (sizes1[i].size !== sizes2[i].size || sizes1[i].price !== sizes2[i].price) {
        return false;
      }
    }
    return true;
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
                      formValue.category === this.product.category &&
                      formValue.price === this.product.price &&
                      formValue.unit === this.product.unit &&
                      JSON.stringify(formValue.sizes) === JSON.stringify(this.product.sizes);

    if (unchanged) {
      this.editProductForm.setErrors({ unchanged: true });
    } else {
      this.editProductForm.setErrors(null);
    }
  }

  private isFormDirtyButUnchanged(): boolean {
    return this.editProductForm.errors?.['unchanged'] || false;
  }

  get sizes(): FormArray {
    return this.editProductForm.get('sizes') as FormArray;
  }

  addSize() {
    this.sizes.push(this.fb.group({
      size: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    }));
  }

  removeSize(index: number) {
    this.sizes.removeAt(index);
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
            unit: formData.unit,
            sizes: formData.sizes
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
