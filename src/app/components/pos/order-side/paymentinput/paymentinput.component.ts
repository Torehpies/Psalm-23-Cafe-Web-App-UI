import { Component, inject } from '@angular/core';
import { PaymentInputService } from '../../../../services/paymentinput.service';
import { OrderService } from '../../../../services/order.service';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReceiptModalComponent } from '../../receipt-modal/receipt-modal.component';

@Component({
  selector: 'app-paymentinput',
  standalone: true,
  imports: [FormsModule, CommonModule, ReceiptModalComponent],
  templateUrl: './paymentinput.component.html',
  styleUrl: './paymentinput.component.css'
})
export class PaymentinputComponent {

  paymentTypes: string[] = ['Cash', 'Paymaya', 'GCash'];

  private _payment: number = 0;
  get payment(): number {
    return this._payment;
  }
  set payment(value: number) {
    this._payment = value;
    this.calculateChange();
  }
  change: number = 0;
  total: number = 0;
  showModal: boolean = false;
  selectedPaymentType: string = '';

  private paymentInputService: PaymentInputService = inject(PaymentInputService);
  orderService: OrderService = inject(OrderService);
  private authService: AuthService = inject(AuthService);
  
  constructor() {}

  ngOnInit() {
    // Subscribe to the payment input value
    this.paymentInputService.payment$.subscribe((payment) => {
      this._payment = payment;
      this.calculateChange();
    });

    // Subscribe to total amount (optional, in case the total changes dynamically)
    this.orderService.totalAmount$.subscribe(() => {
      this.total = this.orderService.getTotalAmount();
      this.calculateChange();
    });
  }

  setPaymentType(paymentType: string) {
    this.paymentInputService.setPaymentType(paymentType);
    this.selectedPaymentType = paymentType;
    this.showModal = true;
  }

  addBill(amount: number) {
    this.paymentInputService.addPayment(amount);
  }

  clearPayment() {
    this.paymentInputService.clearPayment();
  }

  calculateChange() {
    const total = this.orderService.getTotalAmount();
    this.change = this.payment - total;
  }

  closeModal() {
    this.showModal = false;
  }

  handleConfirmPayment() {
    const employeeId = this.authService.getUserId(); // Replace with actual employee ID if available
    this.orderService.sendOrder(this.total, this.selectedPaymentType, employeeId)
      .subscribe({
        next: (response) => {
          this.showModal = false;
          this.paymentInputService.clearPayment(); // Clear payment after successful order
          this.orderService.clearLineItems(); // Clear line items after successful order
          // Additional logic to handle successful order submission
        },
        error: (error) => {
          console.error('Error sending order:', error);
        }
      });
  }
}
