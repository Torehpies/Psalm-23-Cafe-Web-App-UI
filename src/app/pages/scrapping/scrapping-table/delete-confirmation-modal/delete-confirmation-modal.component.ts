import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    standalone  : true,
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css'],
  imports: [CommonModule]
})
export class DeleteConfirmationModalComponent {
  @Input() showDeleteConfirm = false;
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmDelete.emit();
  }

  onCancel(): void {
    this.cancelDelete.emit();
  }
}
