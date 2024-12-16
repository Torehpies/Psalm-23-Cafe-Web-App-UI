import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../models/product/product.model';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css']
})
export class AddProductModalComponent {
  @Input() showAddForm = false;
  @Input() productData: Product[] = [];
  @Output() closeAddForm = new EventEmitter<void>();
  @Output() addProduct = new EventEmitter<any>();

  addItemForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addItemForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      dateProduced: [new Date().toISOString().substring(0, 10), Validators.required],
      expirationDate: [new Date().toISOString().substring(0, 10), Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addItemForm.valid) {
      const selectedProduct = this.productData.find(product => product.name === this.addItemForm.value.itemName);
      const newProduceHistory = {
        ...this.addItemForm.value,
        id: selectedProduct?._id
      };
      this.addProduct.emit(newProduceHistory);
      this.addItemForm.reset();
      this.closeAddForm.emit();
    }
  }
}
