import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { AccountManagement } from '../../../models/account-management.model';

@Component({
  selector: 'app-account-management-update',
  standalone: true,
  templateUrl: './update.component.html',
  imports: [FormsModule, CommonModule],  
})
export class AccountManagementUpdateComponent {

  @Input() account: AccountManagement | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() accountUpdated = new EventEmitter<void>();

  roles: string[] = ['Manager', 'Baker', 'Barista', 'Cashier', 'Helper'];
  
  closePopup() {
    this.close.emit();
  }
  
  onSubmit() {
    // Handle form submission logic here
    this.accountUpdated.emit();
    this.closePopup();
  }
}
