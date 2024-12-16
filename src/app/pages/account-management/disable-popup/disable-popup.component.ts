
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-disable-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disable-popup.component.html'
})
export class AccountDisablePopupComponent {
  showDisablePopup: boolean = false;

  openDisablePopup(): void {
    this.showDisablePopup = true;
  }

  closeDisablePopup(): void {
    this.showDisablePopup = false;
  }

  disableAccount(): void {
    console.log("Account Disabled");
    this.closeDisablePopup(); 
  }
}