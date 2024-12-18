import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementService } from '../../../services/accountmanagement.service';
import { AccountManagement } from '../../../models/account-management.model';

@Component({
  selector: 'app-account-delete-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-popup.component.html'
})
export class AccountDeletePopupComponent {
  @Output() close = new EventEmitter<void>();
  @Input() account: AccountManagement | null = null ; // Add Input property for account ID

  showDeletePopup: boolean = false;

  constructor(private accountManagementService: AccountManagementService) {}

  openDeletePopup(): void {
    this.showDeletePopup = true;
  }

  closeDeletePopup(): void {
    this.close.emit();
  }

  deleteAccount(): void {
    if (this.account) {
      this.accountManagementService.deleteAccount(this.account._id).subscribe(() => {
        console.log("Account Deleted");
        this.reloadPage
        this.closeDeletePopup();
      });
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
