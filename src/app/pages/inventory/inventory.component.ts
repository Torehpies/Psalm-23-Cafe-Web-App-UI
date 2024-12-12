import { Component, inject } from '@angular/core';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemFormComponent } from './item-form/item-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { RestockFormComponent } from './restock-form/restock-form.component';
import { SuppliesService } from '../../services/supplies.service';
import { Supplies } from '../../models/supplies.model';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [LeftsidebarComponent, HeaderComponent, CommonModule, ItemFormComponent, ItemDetailComponent, ReactiveFormsModule, RestockFormComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export default class InventoryComponent {
  router = inject(Router);

  isMenuActive: boolean = false;
  showItemForm: boolean = false;
  items: Supplies[] = []; // Array to hold the items
  showItemDetail: boolean = false;
  showRestockForm: boolean = false;
  selectedItem: any = null;

  constructor(private menuService: MenuService, private suppliesService: SuppliesService) {}

  ngOnInit() {
    // Subscribe to menu status updates
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    // Change the header text
    this.menuService.changeHeaderText('Inventory');

    this.refreshItems(); // Initial load of items
  }

  toggleShowItemForm() {
    this.showItemForm = !this.showItemForm;
  }

  addItem(item: Supplies) {
    console.log('Adding item to backend:', item);
    this.suppliesService.addSupply(item).subscribe(
      (response) => {
        console.log('Backend response (add item):', response);
        // Immediately push the new item to the local array
        this.items.push(response); // Add the item directly to the local array
      },
      (error) => {
        console.error('Error adding item:', error);
      }
    );
  }

  onItemAdded(newItem: Supplies) {
    console.log('onItemAdded triggered with:', newItem); // Debugging
    this.items.push(newItem); // Add the new item directly to the local array
  }

  refreshItems() {
    this.suppliesService.getSupplies().subscribe((items) => {
      this.items = items;
    });
  }

  // Handle the click on an item card
  showItemDetails(item: any) {
    this.selectedItem = item;
    this.showItemDetail = true;
  }

  closeItemDetailsModal() {
    this.showItemDetail = false;
    this.selectedItem = null;
  }

  toggleRestockForm() {
    this.showRestockForm = !this.showRestockForm;
  }

  reloadPage() {
    window.location.reload();
  }

  onRestockConfirmed(restockedItems: any[]) {
    restockedItems.forEach((restockedItem) => {
      const index = this.items.findIndex(item => item._id === restockedItem._id);
      if (index !== -1) {
        this.items[index].currentStock = restockedItem.quantity; // Update the stock quantity
      } else {
        this.items.push(restockedItem); // Add new item if not found
      }
    });
    this.items = [...this.items]; // Trigger change detection
    this.showRestockForm = false; // Close the restock form
  }
}
