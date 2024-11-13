import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmModalComponent],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent {
  @Output() visible = new EventEmitter<void>();
  @Output() itemAdded = new EventEmitter<any>();

  addItemForm: FormGroup;
  units: string[] = ['kilograms', 'grams', 'liters', 'milliliters'];
  isCustomUnitSelected: boolean = false;
  showModal: boolean = false;
  modalMessage: string = '';
  isPromptVisible: boolean = false;
  isSubmitAction: boolean = false;  // New flag to track whether the modal is for submission

  constructor(private fb: FormBuilder) {
    this.addItemForm = this.fb.group({
      name: ['', Validators.required],
      unit: ['', Validators.required],
      customUnit: [''],
      parLevel: ['', [Validators.required, Validators.min(0)]],  // New PAR level control
    });
  }

  onUnitChange(event: any): void {
    const selectedUnit = event.target.value;
    this.isCustomUnitSelected = selectedUnit === 'custom';
    if (!this.isCustomUnitSelected) {
      this.addItemForm.get('customUnit')?.setValue('');
    }
  }

  openCancelModal(): void {
    this.modalMessage = 'Are you sure you want to cancel? All changes will be lost.';
    this.isSubmitAction = false;  // Set to false for cancel action
    this.showModal = true;
  }

  openSubmitModal(): void {
    this.modalMessage = 'Are you sure you want to submit this item?';
    this.isSubmitAction = true;  // Set to true for submit action
    this.showModal = true;
  }

  onSubmit(): void {
    this.openSubmitModal();
  }

  onConfirmed(isConfirmed: boolean): void {
    if (isConfirmed) {
      if (this.isSubmitAction) {  // Only submit if it was a submit action
        if (this.addItemForm.valid) {
          const formData = this.addItemForm.value;
          const itemWithDefaultQuantity = { ...formData, quantity: 0 };
          this.itemAdded.emit(itemWithDefaultQuantity);
        } else {
          console.log('Form is not valid!');
        }
      }
    }

    this.showModal = false;
    if (!this.isSubmitAction) {  // Only reset form on cancel action
      this.addItemForm.reset();
    }
    this.visible.emit();
  }

  onModalCancel(): void {
    this.showModal = false;
    this.addItemForm.reset();
    
  }

  toggleVisible() {
    this.visible.emit();
  }
}
