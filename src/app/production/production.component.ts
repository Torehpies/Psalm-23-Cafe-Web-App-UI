import { Component } from '@angular/core';
import { LeftsidebarComponent } from '../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { MenuService } from '../services/menu.service';
import { ProductionTableComponent } from './production-table/production-table.component';

@Component({
  selector: 'app-production',
  standalone: true,
  imports: [LeftsidebarComponent, HeaderComponent, ProductionTableComponent],
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent {

  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;       
    });
    this.menuService.changeHeaderText('Production');
  }

  onItemAdded(item: any) {
    // Logic to handle the added item
    console.log('Item added:', item);
  }
}
