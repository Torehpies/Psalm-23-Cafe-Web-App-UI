import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LeftsidebarComponent,  // Include the left sidebar to ensure consistency in layout
  ],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    // Subscribe to the menu active status
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    // Change the header text to "Reports" just like in the TransactionComponent
    this.menuService.changeHeaderText('Reports');
  }
}