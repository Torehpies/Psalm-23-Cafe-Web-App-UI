import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-edit-scrap-modal',
  templateUrl: './edit-scrap-modal.component.html',
  styleUrls: ['./edit-scrap-modal.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class EditScrapModalComponent {
  @Input() showEditForm = false;
  @Input() supplyData: any[] = [];
  @Input() productData: any[] = [];
  @Input() currentItem: any;
  @Output() closeEditForm = new EventEmitter<void>();
  @Output() updateScrap = new EventEmitter<any>();

  editItemForm: FormGroup;
  itemOptions: any[] = [];

  constructor(private fb: FormBuilder) {
    this.editItemForm = this.fb.group({
      itemType: ['', Validators.required],
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1), this.stockValidator.bind(this)]],
      scrapDate: ['', Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.currentItem) {
      this.editItemForm.patchValue({
        itemType: this.currentItem.itemType,
        itemName: this.currentItem.itemName,
        quantity: this.currentItem.quantity,
        scrapDate: this.currentItem.usedAt
      });
      this.onItemTypeChange();
    }
  }

  onItemTypeChange(): void {
    const itemType = this.editItemForm.get('itemType')?.value;
    this.itemOptions = itemType === 'Supplies' ? this.supplyData : this.productData;
  }

  stockValidator(control: AbstractControl): ValidationErrors | null {
    const selectedItem = this.itemOptions.find(item => item.name === this.editItemForm?.value.itemName);
    if (selectedItem && control.value > selectedItem.currentStock) {
      return { insufficientStock: true };
    }
    return null;
  }

  onUpdate(): void {
    if (this.editItemForm.valid) {
      const itemType = this.editItemForm.get('itemType')?.value;
      const itemName = this.editItemForm.get('itemName')?.value;
      const item = itemType === 'Supplies' ? this.supplyData.find(item => item.name === itemName) : this.productData.find(item => item.name === itemName);

      const updatedScrap = {
        ...this.editItemForm.value,
        itemId: item._id,
        itemName: item.name
      };

      this.updateScrap.emit(updatedScrap);
      this.editItemForm.reset();
      this.closeEditForm.emit();
    }
  }

  onCancel(): void {
    this.editItemForm.reset();
    this.closeEditForm.emit();
  }
}
