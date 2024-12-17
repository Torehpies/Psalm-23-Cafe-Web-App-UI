import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { DataService } from '../../services/data.service';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { AccountManagementUpdateComponent } from './update/update.component';
import { AccountDeletePopupComponent } from './delete-popup/delete-popup.component';
import { AccountDisablePopupComponent } from './disable-popup/disable-popup.component';
import { AccountInfoPopupComponent } from './info-popup/info-popup.component';
import { AccountManagementService } from '../../services/accountmanagement.service';
import { AuthService } from '../../services/auth.service';
import { AccountManagement } from '../../models/account-management.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [
    CommonModule,
    LeftsidebarComponent,
    HeaderComponent,
    AccountManagementUpdateComponent,
    AccountDeletePopupComponent,
    AccountDisablePopupComponent,
    AccountInfoPopupComponent,
  ],
  templateUrl: './account-management.component.html'
})
export default class AccountManagementComponent implements OnInit {
  isMenuActive: boolean = false;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  showUpdateForm: boolean = false;
  showDeletePopup: boolean = false;
  showDisablePopup: boolean = false;
  showInfoPopup: boolean = false;

  index: number | null = null;
  selectedAccount: AccountManagement | null = null;

  unapprovedAccounts: AccountManagement[] = [];
  approvedAccounts: AccountManagement[] = [];

  constructor(
    private accountManagementService: AccountManagementService,
    private menuService: MenuService,
  ) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    this.menuService.changeHeaderText('Account Management');
    this.fetchAccounts();
  }

  fetchAccounts() {
    this.isLoading = true;
    forkJoin({
      unapproved: this.accountManagementService.getUnapprovedAccounts(),
      approved: this.accountManagementService.getApprovedAccounts()
    }).subscribe({
      next: (results) => {
        this.unapprovedAccounts = results.unapproved.data;
        this.approvedAccounts = results.approved.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch accounts';
        this.isLoading = false;
      }
    });
  }

  openUpdateComponent(account: AccountManagement) {
    this.selectedAccount = account;
    this.showUpdateForm = true;
  }

  closeUpdateComponent() {
    this.showUpdateForm = false;
    this.selectedAccount = null;
  }

  openDeletePopup(account: AccountManagement): void {
    this.selectedAccount = account;
    this.showDeletePopup = true;
  }

  closeDeletePopup() {
    this.showDeletePopup = false;
    this.selectedAccount = null;
  }

  openDisablePopup(account: AccountManagement): void {
    this.selectedAccount = account;
    this.showDisablePopup = true;
  }

  closeDisablePopup() {
    this.showDisablePopup = false;
    this.selectedAccount = null;
  }

  openInfoPopup() {
    this.showInfoPopup = true;
  }

  closeInfoPopup() {
    this.showInfoPopup = false;
  }

  onAccountUpdated() {
    this.fetchAccounts();
    this.selectedAccount = null;
  }
}
