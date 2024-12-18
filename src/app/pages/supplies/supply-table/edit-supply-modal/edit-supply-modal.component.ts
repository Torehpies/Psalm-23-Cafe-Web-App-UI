import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Supplies } from '../../../../models/supplies.model';

@Component({
  standalone: true,
  selector: 'app-edit-supply-modal',
  templateUrl: './edit-supply-modal.component.html',
  styleUrls: ['./edit-supply-modal.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class EditSupplyModalComponent implements OnChanges {
  @Input() showEditForm: boolean = false;
  @Input() currentItem: any;
  @Input() supplyData: Supplies[] = [];
  @Output() closeEditForm = new EventEmitter<void>();
  @Output() updateSupply = new EventEmitter<any>();

  editItemForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editItemForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1), this.stockValidator.bind(this)]],
      dateProduced: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentItem'] && this.currentItem) {
      this.editItemForm.patchValue({
        itemName: this.currentItem.supply.name,
        quantity: this.currentItem.quantity,
        dateProduced: this.currentItem.usedAt
      });
    }
  }

  stockValidator(control: AbstractControl): ValidationErrors | null {
    const selectedSupply = this.supplyData.find(supply => supply.name === this.editItemForm?.value.itemName);
    if (selectedSupply && control.value > selectedSupply.currentStock) {
      return { insufficientStock: true };
    }
    return null;
  }

  onUpdate(): void {
    if (this.editItemForm.valid) {
      const selectedSupply = this.supplyData.find(supply => supply.name === this.editItemForm.value.itemName);
      const updatedSupply = {
        ...this.editItemForm.value,
        id: selectedSupply?._id
      };
      this.updateSupply.emit(updatedSupply);
      this.editItemForm.reset();
      this.closeEditForm.emit(); // Ensure the form closes after submission
    }
  }

  onCancel(): void {
    this.editItemForm.reset();
    this.closeEditForm.emit();
  }
}
