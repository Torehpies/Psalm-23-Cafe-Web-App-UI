import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
  selector: 'app-add-supply-modal',
  templateUrl: './add-supply-modal.component.html',
  styleUrls: ['./add-supply-modal.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddSupplyModalComponent {
  @Input() showAddForm: boolean = false;
  @Output() closeAddForm = new EventEmitter<void>();
  @Output() addSupply = new EventEmitter<any>();

  addItemForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addItemForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      dateProduced: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addItemForm.valid) {
      this.addSupply.emit(this.addItemForm.value);
      this.addItemForm.reset();
      this.closeAddForm.emit();
    }
  }

  onCancel(): void {
    this.addItemForm.reset();
    this.closeAddForm.emit();
  }
}
