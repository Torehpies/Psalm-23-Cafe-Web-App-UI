import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-account-monitoring',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LeftsidebarComponent, 
    HeaderComponent
  ],
  templateUrl: './account-monitoring.component.html',
  styleUrls: ['./account-monitoring.component.css'],
})
export default class AccountMonitoringComponent implements OnInit {
  isMenuActive: boolean = false;
  startDate: string = ''; 
  endDate: string = ''; 

// Sample employee data
employees = [
  {
    name: 'Juan Dela Cruz',
    role: 'Baker',
    attendance: [
      { date: 'Jan. 01, 2024', timeIn: '7:00 AM', timeOut: '9:00 PM' },
      { date: 'Jan. 02, 2024', timeIn: '7:00 AM', timeOut: '9:00 PM' },
      { date: 'Jan. 03, 2024', timeIn: '7:00 AM', timeOut: '9:00 PM' },
    ],
  },
  {
    name: 'Maria Santos',
    role: 'Chef',
    attendance: [
      { date: 'Jan. 01, 2024', timeIn: '8:00 AM', timeOut: '4:00 PM' },
      { date: 'Jan. 02, 2024', timeIn: '8:00 AM', timeOut: '4:00 PM' },
      { date: 'Jan. 03, 2024', timeIn: '8:00 AM', timeOut: '4:00 PM' },
    ],
  },
];

  selectedEmployee: any = null;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    this.menuService.changeHeaderText('Account Monitoring');
  }

  download(type: string) {
    console.log(`Download type: ${type}`);
    // Add API call for download based on type
  }

  selectEmployee(employee: any) {
    this.selectedEmployee = employee;
  }
}