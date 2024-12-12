import { Component, inject } from '@angular/core';
import { LeftsidebarComponent } from '../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemFormComponent } from './item-form/item-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { InventoryService } from '../services/inventory.service';
import { Observable, of } from 'rxjs';
import { RestockFormComponent } from './restock-form/restock-form.component';
import { ItemTestService } from '../services/item-test.service';

interface Item {
  name: string;
  category: string;
  par: number;
  unit: string;
  stock: number;
}

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
  items: Item[] = []; // Array to hold the items
  //items$: Observable<Item[]> = of([]); // Observable to hold the items
  //private inventoryService = inject(InventoryService)
  quantity = 0;
  showItemDetail: boolean = false;
  showRestockForm: boolean = false;
  //selectedItem: Item | null = null;
  selectedItem: any = null;

  constructor(private menuService: MenuService, private itemTestService: ItemTestService) {}

  ngOnInit() {
    // Subscribe to menu status updates
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    // Change the header text
    this.menuService.changeHeaderText('Inventory');

    // Fetch items from the backend
    //this.items$ = this.inventoryService.getItems();
    this.refreshItems();
  }
  
  refreshItems() {
    this.items = this.itemTestService.getItem();
  }
  
  
  toggleShowItemForm() {
    this.showItemForm = !this.showItemForm;
  }

  addItem(item: Item) {
    this.itemTestService.additem(item); // Add item to the array
    this.refreshItems();
  }

  onItemAdded(newItem: Item) {
    this.addItem(newItem); // Add the received item to the list
  }

 // New method to handle adding an item to both frontend and backend
 /*addItemToBackend(item: Item) {
  this.inventoryService.addItem(item).forEach(() => {
    // Refresh items$ to get the updated list of items
    this.items$ = this.inventoryService.getItems();
    this.showItemForm = false; // Hide the item form
  }).catch(error => {
    console.error('Error adding item:', error);
  });
}*/

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

}
