import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { ItemTestService } from '../../services/item-test.service';

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
  categories: string[] = ['Ingredient', 'Supply']
  unitsByCategory: { [key: string]: string[] } = {
    Ingredient: ['kilograms', 'grams', 'liters', 'milliliters'],
    Supply: ['pieces', 'packs', 'rolls'],
  };
  units: string[] = [];
  isCustomUnitSelected: boolean = false;
  showModal: boolean = false;
  modalMessage: string = '';
  isPromptVisible: boolean = false;
  isSubmitAction: boolean = false;  // New flag to track whether the modal is for submission

  constructor(private fb: FormBuilder, private itemTestService: ItemTestService) {
    this.addItemForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      unit: ['', Validators.required],
      customUnit: [''],
      parLevel: ['', [Validators.required, Validators.min(0)]],  // New PAR level control
    });

     // Listen for changes to the category and update units
     this.addItemForm.get('category')?.valueChanges.subscribe((selectedCategory) => {
      this.units = this.unitsByCategory[selectedCategory] || [];
      this.addItemForm.get('unit')?.setValue(''); // Reset the unit field
    });
  }

  onUnitChange(event: any): void {
    const selectedUnit = event.target.value;
    if (selectedUnit === 'custom') {
      this.isCustomUnitSelected = true;
      // Assign the custom unit value to the unit field directly
      this.addItemForm.get('unit')?.setValue(this.addItemForm.get('customUnit')?.value || ''); // Set custom unit in the unit field
    } else {
      this.isCustomUnitSelected = false;
      this.addItemForm.get('customUnit')?.setValue(''); // Clear the custom unit field
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

          if (this.isCustomUnitSelected) {
            formData.unit = formData.customUnit;
          }

          // Add item to the service
          this.itemTestService.additem({ ...formData, stock: 0, par: formData.parLevel });

          // Emit the item added (optional, in case you need to update UI elsewhere)
          this.itemAdded.emit(formData);
          
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
