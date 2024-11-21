import { Component } from '@angular/core';
import { LeftsidebarComponent } from '../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { MenuService } from '../services/menu.service';
import { SupplyTableComponent } from './supply-table/supply-table.component';

@Component({
  selector: 'app-supplies',
  standalone: true,
  imports: [LeftsidebarComponent, HeaderComponent, SupplyTableComponent],
  templateUrl: './supplies.component.html',
  styleUrl: './supplies.component.css'
})
export class SuppliesComponent {

  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
      this.menuService.isMenuActive$.subscribe((status) => {
          this.isMenuActive = status;       
      });
      this.menuService.changeHeaderText('Supplies');
  }

}


