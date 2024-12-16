import { Component, Input, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagement } from '../../../models/account-management.model';
import { AccountManagementService } from '../../../services/accountmanagement.service';

@Component({
  selector: 'app-account-info-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-popup.component.html'
})
export class AccountInfoPopupComponent {
  @Input() unapprovedAccounts: AccountManagement[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() accountUpdated = new EventEmitter<void>();

  accountManagementService: AccountManagementService = inject(AccountManagementService);

  closePopup(): void {
    this.close.emit();
  }

  approveAccount(id: string): void {
    this.accountManagementService.approveAccount(id).subscribe({
      next: () => {
        console.log(`Approved account: ${id}`);
        this.accountUpdated.emit();
      },
      error: (error) => {
        console.log(error);
      }
    });
    // this.closePopup();
  }
  
  rejectAccount(id: string): void {
    this.accountManagementService.rejectAccount(id).subscribe({
      next: () => {
        console.log(`Rejected account: ${id}`);
        this.accountUpdated.emit();
      },
      error: (error) => {
        console.log(error);
      }
    });
    // console.log("Account Rejected");
    // this.closePopup();
  }
}