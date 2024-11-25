import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { ItemTestService } from '../../services/item-test.service';
@Component({
  selector: 'app-item-restock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmModalComponent],
  templateUrl: './item-restock.component.html',
  styleUrls: ['./item-restock.component.css'],
})
export class ItemRestockComponent {
  @Output() restockItem = new EventEmitter<any>();  // Receive item from parent
  @Output() close = new EventEmitter<void>();
  @Output() restock = new EventEmitter<any>();  // Emit the updated item back to the parent

  restockForm: FormGroup;
  showModal: boolean = false;  // Flag to control modal visibility
  modalMessage: string = '';  // The message to be displayed in the modal

  items: {name: string}[] = [];

  constructor(private fb: FormBuilder, private itemTestService: ItemTestService) {
    this.restockForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      expireDate: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.items = this.itemTestService.getItem().map((item) => ({
      name: item.name,
    }))
  }

  // Trigger the confirmation modal
  submitRestock() {
    if (this.restockForm.valid) {
      this.modalMessage = `Are you sure you want to restock these item(s)?`;  // Set the message
      this.showModal = true;  // Show the confirmation modal
    } else {
      alert('Please enter valid quantity and price!');
    }
  }

  // Confirm restock operation
  onConfirmed(isConfirmed: boolean): void {
    if (isConfirmed) {
      const restockData = this.restockForm.value;
      this.restockItem.emit(this.restockForm.value);
      this.restockForm.reset();
    }
    this.showModal = false;  // Close the confirmation modal
  }

  // Cancel restock operation
  onModalCancel(): void {
    this.showModal = false;  // Close the confirmation modal
  }

  closeModal() {
    this.close.emit();
  }
}
