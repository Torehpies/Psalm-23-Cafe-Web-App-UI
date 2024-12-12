import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';

@Component({
  selector: 'app-product-performance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LeftsidebarComponent,
  ],
  templateUrl: './product-performance.component.html',
  styleUrls: ['./product-performance.component.css'],
})
export class ProductPerformanceComponent implements OnInit {
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    // Set the header text to "Reports"
    this.menuService.changeHeaderText('Reports');
  }
}
