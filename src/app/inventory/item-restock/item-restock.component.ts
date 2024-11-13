import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-item-restock',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
  templateUrl: './item-restock.component.html',
  styleUrls: ['./item-restock.component.css'],
})
export class ItemRestockComponent {
  @Input() item: any;  // Receive item from parent
  @Output() close = new EventEmitter<void>();
  @Output() restock = new EventEmitter<any>();  // Emit the updated item back to the parent

  quantity: number = 0;
  price: number = 0;
  showModal: boolean = false;  // Flag to control modal visibility
  modalMessage: string = '';  // The message to be displayed in the modal

  // Trigger the confirmation modal
  submitRestock() {
    if (this.quantity > 0 && this.price > 0) {
      this.modalMessage = `Are you sure you want to restock ${this.item.name}?`;  // Set the message
      this.showModal = true;  // Show the confirmation modal
    } else {
      alert('Please enter valid quantity and price!');
    }
  }

  // Confirm restock operation
  onConfirmed(isConfirmed: boolean): void {
    if (isConfirmed) {
      // If confirmed, update the item's quantity
      this.item.quantity += this.quantity;

      // Create the restock history record
      const date = new Date().toLocaleDateString();
      const restockHistory = { quantity: this.quantity, price: this.price, date };
      this.item.restockHistory.push(restockHistory);

      this.quantity = 0;  // Reset the form values
      this.price = 0;
    }
    this.showModal = false;  // Close the confirmation modal
    this.close.emit();
  }

  // Cancel restock operation
  onModalCancel(): void {
    this.showModal = false;  // Close the confirmation modal
  }

  closeModal() {
    this.close.emit();
  }
}
