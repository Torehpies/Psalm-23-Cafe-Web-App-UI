import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
  @Input() selectedItem: any;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedItem'] && this.selectedItem) {
      this.editItemForm.patchValue({
        itemType: this.selectedItem.itemType,
        itemName: this.selectedItem.itemName,
        quantity: this.selectedItem.quantity,
        scrapDate: this.selectedItem.usedAt
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
      const updatedScrap = {
        ...this.editItemForm.value,
        itemId: this.itemOptions.find(item => item.name === this.editItemForm.value.itemName)._id,
      };

      this.updateScrap.emit(updatedScrap);
      this.editItemForm.reset();
      this.closeEditForm.emit();
    }
  }

  onCancel(): void {
    
    // this.editItemForm.reset();
    this.closeEditForm.emit();
  }
}
