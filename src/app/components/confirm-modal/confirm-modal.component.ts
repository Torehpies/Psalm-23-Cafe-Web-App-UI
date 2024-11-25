import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  @Input() message: string = 'Are you sure?';
  @Output() confirmed = new EventEmitter<boolean>();
  @Output() canceled = new EventEmitter<void>();

  closeModal(action: boolean): void {
    if (action) {
      this.confirmed.emit(true); // Emit 'true' if user clicks 'Yes'
    } else {
      this.canceled.emit(); // Emit 'void' if user clicks 'No'
    }
  }
}
