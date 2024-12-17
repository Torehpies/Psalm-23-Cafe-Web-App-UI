import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { MenuService } from '../../services/menu.service';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, // Enable routing for navigation within the component
    LeftsidebarComponent, // Include the sidebar component
  ],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  isMenuActive: boolean = false; // Tracks the sidebar toggle state

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    // Subscribe to the sidebar state changes
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    // Update the header text for this view
    this.menuService.changeHeaderText('Reports');
  }
}
