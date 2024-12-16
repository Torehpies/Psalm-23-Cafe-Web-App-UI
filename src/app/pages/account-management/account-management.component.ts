import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { DataService } from '../../services/data.service';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { AccountManagementUpdateComponent } from './update/update.component';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [
    CommonModule,
    LeftsidebarComponent,
    HeaderComponent,
    AccountManagementUpdateComponent,
  ],
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css'],
})
export default class AccountManagementComponent implements OnInit {
  isMenuActive: boolean = false;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  showPopup: boolean = false;
  showUpdateForm: boolean = false;
  showDeletePopup: boolean = false;
  showDisablePopup: boolean = false;

  dataItems: any[] = [];

  constructor(
    private menuService: MenuService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    this.menuService.changeHeaderText('Account Management');

    this.loadUserData();
  }

  loadUserData() {
    setTimeout(() => {
      this.dataItems = [
        { id: 1, name: 'John Doe', role: 'Admin', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', role: 'User', email: 'jane.smith@example.com' },
        { id: 3, name: 'Alice Johnson', role: 'Moderator', email: 'alice.johnson@example.com' },
      ];
      this.isLoading = false;
    }, 1000);
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  openDeletePopup(): void {
    this.showDeletePopup = true;
  }

  closeDeletePopup(): void {
    this.showDeletePopup = false;
  }

  deleteAccount(): void {
    console.log('Account Deleted');
    this.closeDeletePopup();
  }

  openDisablePopup(): void {
    this.showDisablePopup = true;
  }

  closeDisablePopup(): void {
    this.showDisablePopup = false;
  }

  disableAccount(): void {
    console.log('Account Disabled');
    this.closeDisablePopup();
  }

  showUpdateComponent() {
    this.showUpdateForm = true;
  }

  hideUpdateComponent() {
    this.showUpdateForm = false;
  }
}
