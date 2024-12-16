import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-delete-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-popup.component.html'
})
export class AccountDeletePopupComponent {
  @Output() close = new EventEmitter<void>();

  showDeletePopup: boolean = false;

  openDeletePopup(): void {
    this.showDeletePopup = true;
  }

  closeDeletePopup(): void {
    this.close.emit();
  }

  deleteAccount(): void {
    console.log("Account Deleted"); 
    this.closeDeletePopup(); 
  }
}
