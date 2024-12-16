import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { MenuService } from '../../../services/menu.service';
import { LeftsidebarComponent } from '../../../components/leftsidebar/leftsidebar.component';
import { HourlyComponent } from './hourly/hourly.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { MonthlyComponent } from './monthly/monthly.component';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, // Add RouterModule here
    LeftsidebarComponent,
    HourlyComponent,
    WeeklyComponent,
    MonthlyComponent,
  ],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  isMenuActive: boolean = false;
  currentComponent: string = 'hourly';

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    this.menuService.changeHeaderText('Reports');
  }

  showComponent(component: string) {
    this.currentComponent = component;
  }
}
