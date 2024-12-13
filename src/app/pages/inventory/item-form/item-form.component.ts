import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';
import { SuppliesService } from '../../../services/supplies.service';
import { Supplies } from '../../../models/supplies.model';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmModalComponent],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent {
  @Output() visible = new EventEmitter<void>();
  @Output() itemAdded = new EventEmitter<Supplies>();

  addItemForm: FormGroup;
  categories: string[] = ['Ingredient', 'Supply']
  unitsByCategory: { [key: string]: string[] } = {
    Ingredient: ['Kilograms', 'Grams', 'Liters', 'Mililiters'],
    Supply: ['pieces', 'packs', 'rolls'],
  };
  units: string[] = [];
  isCustomUnitSelected: boolean = false;
  showModal: boolean = false;
  modalMessage: string = '';
  isPromptVisible: boolean = false;
  isSubmitAction: boolean = false;  // New flag to track whether the modal is for submission
  isDuplicateSupply: boolean = false; // New flag for duplicate supply validation

  constructor(private fb: FormBuilder, private suppliesService: SuppliesService) {
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

   // Listen for changes to the name and category fields for instant duplicate validation
   this.addItemForm.get('name')?.valueChanges
   .pipe(debounceTime(100))
   .subscribe(() => this.checkForDuplicateSupply());
 this.addItemForm.get('category')?.valueChanges
   .pipe(debounceTime(100))
   .subscribe(() => this.checkForDuplicateSupply());
  }

  checkForDuplicateSupply(): void {
    const formData = this.addItemForm.value;
    if (formData.name && formData.category) {
      this.suppliesService.getSupplies().subscribe((supplies) => {
        console.log('Supplies:', supplies);
        const inputName = formData.name.toLowerCase();
        const inputCategory = formData.category.toLowerCase();
        this.isDuplicateSupply = supplies.some(supply => 
          supply.name.toLowerCase() === inputName && supply.category.toLowerCase() === inputCategory
        );
        if (this.isDuplicateSupply) {
          this.addItemForm.setErrors({ duplicate: true }); // Mark form as invalid
        } else {
          this.addItemForm.setErrors(null); // Clear duplicate error if no duplicate found
        }
      });
    }
  }

  onUnitChange(event: any): void {
    const selectedUnit = event.target.value;
  
    if (selectedUnit === 'custom') {
      this.isCustomUnitSelected = true;
      this.addItemForm.get('unit')?.setValue('custom'); // Set unit to custom
      const customUnitControl = this.addItemForm.get('customUnit');
      
      // Make customUnit required when "Custom Unit" is selected
      customUnitControl?.setValidators([Validators.required]);
      customUnitControl?.updateValueAndValidity();
    } else {
      this.isCustomUnitSelected = false;
      this.addItemForm.get('customUnit')?.setValue(''); // Clear the custom unit field
      const customUnitControl = this.addItemForm.get('customUnit');
      
      // Make customUnit not required when another unit is selected
      customUnitControl?.setValidators(null);
      customUnitControl?.updateValueAndValidity();
    }
  
    // Ensure 'unit' validation is updated
    this.addItemForm.get('unit')?.updateValueAndValidity();
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
    if (this.isDuplicateSupply) {
      console.log('Duplicate supply found!');
      return;
    }
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

           // Map form data to Supplies model
           const supply: Supplies = {
            name: formData.name,
            category: formData.category,
            unit: formData.unit,
            currentStock: 0, // Initialize current stock to 0
            par: formData.parLevel,
          };

          this.suppliesService.addSupply(supply).subscribe(
            (response) => {
              console.log('Supply added:', response); // Log the plain text response
              this.itemAdded.emit(response); // Emit the added supply to update the UI
            },
            (error) => {
              console.error('Error adding supply:', error);
            }
          );
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
    this.reloadPage();
  }

  reloadPage() {
    window.location.reload();
  }

  onModalCancel(): void {
    this.showModal = false;
    this.addItemForm.reset();
    
  }

  toggleVisible() {
    this.visible.emit();
  }
}
