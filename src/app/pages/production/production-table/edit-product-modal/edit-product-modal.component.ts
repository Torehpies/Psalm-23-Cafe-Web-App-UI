import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../models/product/product.model';

@Component({
  selector: 'app-edit-product-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css']
})
export class EditProductModalComponent implements OnChanges {
  @Input() showEditForm = false;
  @Input() currentItem: any;
  @Input() productData: Product[] = [];
  @Output() closeEditForm = new EventEmitter<void>();
  @Output() updateProduct = new EventEmitter<any>();

  editItemForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editItemForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      dateProduced: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentItem'] && this.currentItem) {
      this.editItemForm.patchValue({
        itemName: this.currentItem.product.name || this.currentItem.product,
        quantity: this.currentItem.quantity,
        dateProduced: this.currentItem.producedAt,
        expirationDate: this.currentItem.expiresAt
      });
    }
  }

  onUpdate(): void {
    if (this.editItemForm.valid) {
      this.updateProduct.emit(this.editItemForm.value);
      this.editItemForm.reset();
      this.closeEditForm.emit();
    }
  }
}