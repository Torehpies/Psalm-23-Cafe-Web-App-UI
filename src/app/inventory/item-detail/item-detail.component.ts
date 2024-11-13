import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemRestockComponent } from '../item-restock/item-restock.component'; // Import the restock modal

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule, ItemRestockComponent],  // Include ItemRestockComponent here
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent {
  @Input() item: any;  // Ensure this input is properly passed from the parent
  @Output() close = new EventEmitter<void>();
  showRestockModal: boolean = false;  // Track whether the restock modal is open

  ngOnInit() {
    // Make sure restockHistory exists in the item object
    if (!this.item.restockHistory) {
      this.item.restockHistory = [];  // Initialize an empty array if not already present
    }
    console.log(this.item); // Check if item contains quantity
  }

  closeModal() {
    this.close.emit();
  }

  openRestock() {
    this.showRestockModal = true;  // Open restock modal
  }

  closeRestockModal() {
    this.showRestockModal = false;  // Close restock modal
  }


  // Adding a method to update the restock history
  addRestockHistory(quantity: number, price: number) {
    const date = new Date().toLocaleDateString();
    const newRestock = { quantity, price, date };
    this.item.restockHistory.push(newRestock);  // Add to the restock history array
  }
}
