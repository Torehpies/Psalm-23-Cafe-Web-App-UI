
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-disable-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disable-popup.component.html'
})
export class AccountDisablePopupComponent {
  @Output() close = new EventEmitter<void>();

  closeDisablePopup(): void {
    this.close.emit();
  }

  disableAccount(): void {
    this.closeDisablePopup(); 
  }
}