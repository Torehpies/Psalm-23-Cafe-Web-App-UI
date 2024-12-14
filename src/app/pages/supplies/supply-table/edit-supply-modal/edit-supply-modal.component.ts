import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-edit-supply-modal',
  templateUrl: './edit-supply-modal.component.html',
  styleUrls: ['./edit-supply-modal.component.css'],
  imports: [ReactiveFormsModule,CommonModule]
})
export class EditSupplyModalComponent implements OnChanges {
  @Input() showEditForm: boolean = false;
  @Input() currentItem: any;
  @Output() closeEditForm = new EventEmitter<void>();
  @Output() updateSupply = new EventEmitter<any>();

  editItemForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editItemForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
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

  onUpdate(): void {
    if (this.editItemForm.valid) {
      this.updateSupply.emit(this.editItemForm.value);
      this.editItemForm.reset();
      this.closeEditForm.emit();
    }
  }

  onCancel(): void {
    this.editItemForm.reset();
    this.closeEditForm.emit();
  }
}
