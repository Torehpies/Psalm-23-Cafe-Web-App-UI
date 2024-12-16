import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagement } from '../../../models/account-management.model';

@Component({
  selector: 'app-account-info-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-popup.component.html'
})
export class AccountInfoPopupComponent {
  @Input() unapprovedAccounts: AccountManagement[] = [];
  @Output() close = new EventEmitter<void>();

  closePopup(): void {
    this.close.emit();
  }
}