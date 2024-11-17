// import { Component } from '@angular/core';
// import { MenuService } from '../services/menu.service';
// import { LeftsidebarComponent } from '../components/leftsidebar/leftsidebar.component';
// import { HeaderComponent } from '../components/header/header.component';

// @Component({
//   selector: 'app-account-management',
//   standalone: true,
//   imports: [LeftsidebarComponent, HeaderComponent],
//   templateUrl: './account-management.component.html',
//   styleUrl: './account-management.component.css'
// })
// export class AccountManagementComponent {
//   isMenuActive: boolean = false;

//   constructor(private menuService: MenuService) {}

//   ngOnInit() {
//       this.menuService.isMenuActive$.subscribe((status) => {
//           this.isMenuActive = status;     
//       });
//       this.menuService.changeHeaderText('Account Management');
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { DataService } from '../services/data.service';
import { LeftsidebarComponent } from '../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [LeftsidebarComponent, HeaderComponent, CommonModule],
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  isMenuActive: boolean = false;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  showPopup: boolean = false; // Controls popup visibility

  // Ensure that 'dataItems' is typed as an array of any (or more specific type)
  dataItems: any[] = []; // Change to a more specific type if possible

  constructor(private menuService: MenuService, private dataService: DataService) {}

  ngOnInit() {
    // Subscribe to menu state changes
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    // Set header text
    this.menuService.changeHeaderText('Account Management');

    // Fetch data and handle loading and errors
    this.dataService.getData().subscribe(
      (data) => {
        this.dataItems = data; // Store the fetched data
        this.isLoading = false; // Set loading to false after data is fetched
      },
      (error) => {
        this.errorMessage = 'Failed to load data'; // Handle error
        this.isLoading = false; // Set loading to false if there is an error
      }
    );
  }

  // Popup Logic
  openPopup() {
    this.showPopup = true; // Show the popup
  }

  closePopup() {
    this.showPopup = false; // Hide the popup
  }
}

