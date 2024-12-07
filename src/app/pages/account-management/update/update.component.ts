import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-account-management-update',
  standalone: true,
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  imports: [FormsModule, CommonModule],  
})
export class AccountManagementUpdateComponent {
  role: string = ''; 
  isFormVisible: boolean = true; 

  closePopup() {
    this.isFormVisible = false;
    console.log('Form visibility after close:', this.isFormVisible);
  }
  
  openPopup() {
    this.isFormVisible = true;
    console.log('Form visibility after open:', this.isFormVisible);
  }
}
