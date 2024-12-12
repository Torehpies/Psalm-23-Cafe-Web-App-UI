import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';

@Component({
  selector: 'app-financial-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LeftsidebarComponent, // Include sidebar component to keep the layout consistent
  ],
  templateUrl: './financial-reports.component.html',
  styleUrls: ['./financial-reports.component.css'],
})
export class FinancialReportsComponent implements OnInit {
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    // Subscribe to menu active state
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    // Set header text to "Reports" so the header remains consistent
    this.menuService.changeHeaderText('Reports');
  }
}
