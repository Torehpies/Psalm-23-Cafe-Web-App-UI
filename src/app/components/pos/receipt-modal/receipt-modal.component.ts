import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineItem } from '../../../models/lineItem/lineItem.model';

@Component({
  selector: 'app-receipt-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receipt-modal.component.html',
  styleUrl: './receipt-modal.component.css'
})
export class ReceiptModalComponent {
  @Input() lineItems: LineItem[] | null = [];
  @Input() totalAmount: number = 0;
  @Input() paymentType: string = '';
  @Input() change: number = 0;
  @Output() close = new EventEmitter<void>();
  @Output() confirmPayment = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  confirmPaymentHandler() {
    this.confirmPayment.emit();
  }
}
