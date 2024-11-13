import { Component, inject } from '@angular/core';
import { LeftsidebarComponent } from '../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemFormComponent } from './item-form/item-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemDetailComponent } from './item-detail/item-detail.component';

interface Item {
  name: string;
  PAR: number;
  unit: string;
  quantity: number;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [LeftsidebarComponent, HeaderComponent, CommonModule, ItemFormComponent, ItemDetailComponent, ReactiveFormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  router = inject(Router);
  isMenuActive: boolean = false;
  showItemForm: boolean = false;
  items: Item[] = []; // Array to hold the items
  quantity = 0;
  showItemDetail: boolean = false;
  selectedItem: any = null;
  
  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });
    this.menuService.changeHeaderText('Inventory');
  }

  toggleShowItemForm() {
    this.showItemForm = !this.showItemForm;
  }

  addItem(item: Item) {
    this.items.push(item); // Add item to the array
  }

  onItemAdded(newItem: Item) {
    this.addItem(newItem); // Add the received item to the list
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
}
