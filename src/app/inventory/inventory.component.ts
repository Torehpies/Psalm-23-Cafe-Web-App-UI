import { Component, inject } from '@angular/core';
import { LeftsidebarComponent } from '../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Item {
  category: string;
  name: string;
  quantity: number;
  unit: string
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [LeftsidebarComponent,HeaderComponent, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  router = inject(Router);
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
      this.menuService.isMenuActive$.subscribe((status) => {
          this.isMenuActive = status;    
      });
      this.menuService.changeHeaderText('Inventory');
  }

  gotoItemForm(): void {
    this.router.navigate(['item-form']);
  }

  items: Item[] = []; // Array to hold the items

  addItem(item: Item) {
    this.items.push(item); // Add item to the array
  }
}
