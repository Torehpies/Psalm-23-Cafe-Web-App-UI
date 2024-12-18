import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementService } from '../../../services/accountmanagement.service';
import { AccountManagement } from '../../../models/account-management.model';

@Component({
  selector: 'app-account-disable-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disable-popup.component.html'
})
export class AccountDisablePopupComponent {
  @Input() account: AccountManagement | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() accountUpdated = new EventEmitter<void>();

  constructor(private accountManagementService: AccountManagementService) {}

  closeDisablePopup(): void {
    this.close.emit();
  }

  disableAccount(): void {
    if (this.account) {
      const action = this.account.status === 'disabled' ? 'enable' : 'disable';
      const serviceMethod = action === 'disable' ? this.accountManagementService.disableAccount(this.account._id) :  this.accountManagementService.enableAccount(this.account._id);

      serviceMethod.subscribe(() => {
        this.accountUpdated.emit();
        this.closeDisablePopup();
      });
    }
  }
}