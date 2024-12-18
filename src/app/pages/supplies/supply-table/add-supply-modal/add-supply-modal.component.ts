import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Supplies } from '../../../../models/supplies.model';

@Component({
  standalone: true,
  selector: 'app-add-supply-modal',
  templateUrl: './add-supply-modal.component.html',
  styleUrls: ['./add-supply-modal.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddSupplyModalComponent {
  @Input() showAddForm: boolean = false;
  @Input() supplyData: Supplies[] = [];
  @Output() closeAddForm = new EventEmitter<void>();
  @Output() addSupply = new EventEmitter<any>();

  addItemForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addItemForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1), this.stockValidator.bind(this)]],
      dateProduced: ['', Validators.required]
    });
  }

  stockValidator(control: AbstractControl): ValidationErrors | null {
    const selectedSupply = this.supplyData.find(supply => supply.name === this.addItemForm?.value.itemName);
    if (selectedSupply && control.value > selectedSupply.currentStock) {
      return { insufficientStock: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.addItemForm.valid) {
      const selectedSupply = this.supplyData.find(supply => supply.name === this.addItemForm.value.itemName);
      const newSupply = {
        ...this.addItemForm.value,
        id: selectedSupply?._id
      };
      this.addSupply.emit(newSupply);
      this.addItemForm.reset();
      this.closeAddForm.emit(); // Ensure the form closes after submission
    }
  }

  onCancel(): void {
    this.addItemForm.reset();
    this.closeAddForm.emit();
  }
}
