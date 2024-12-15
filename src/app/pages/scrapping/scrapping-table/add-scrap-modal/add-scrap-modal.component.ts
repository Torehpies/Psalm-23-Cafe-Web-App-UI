import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-scrap-modal',
  templateUrl: './add-scrap-modal.component.html',
  styleUrls: ['./add-scrap-modal.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddScrapModalComponent {
  @Input() showAddForm = false;
  @Input() supplyData: any[] = [];
  @Input() productData: any[] = [];
  @Output() closeAddForm = new EventEmitter<void>();
  @Output() addScrap = new EventEmitter<any>();

  addItemForm: FormGroup;
  itemOptions: any[] = [];

  constructor(private fb: FormBuilder) {
    this.addItemForm = this.fb.group({
      itemType: ['', Validators.required],
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1), this.stockValidator.bind(this)]],
      scrapDate: ['', Validators.required]
    });
  }

  onItemTypeChange(): void {
    const itemType = this.addItemForm.get('itemType')?.value;
    this.itemOptions = itemType === 'Supplies' ? this.supplyData : this.productData;
  }

  stockValidator(control: AbstractControl): ValidationErrors | null {
    const selectedItem = this.itemOptions.find(item => item.name === this.addItemForm?.value.itemName);
    if (selectedItem && control.value > selectedItem.currentStock) {
      return { insufficientStock: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.addItemForm.valid) {
      const newScrap = {
        ...this.addItemForm.value,
        itemId: this.itemOptions.find(item => item.name === this.addItemForm.value.itemName)._id,
      }

      this.addScrap.emit(newScrap);
      this.addItemForm.reset();
      this.closeAddForm.emit();
    }
  }

  onCancel(): void {
    this.addItemForm.reset();
    this.closeAddForm.emit();
  }
}
