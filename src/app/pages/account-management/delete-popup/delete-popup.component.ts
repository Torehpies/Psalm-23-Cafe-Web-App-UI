import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-delete-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-popup.component.html'
})
export class AccountDeletePopupComponent {
  showDeletePopup: boolean = false;

  openDeletePopup(): void {
    this.showDeletePopup = true;
  }

  closeDeletePopup(): void {
    this.showDeletePopup = false;
  }

  deleteAccount(): void {
    console.log("Account Deleted"); 
    this.closeDeletePopup(); 
  }
}
