import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentInputService {
  private paymentSubject = new BehaviorSubject<number>(0);
  payment$ = this.paymentSubject.asObservable();

  constructor() {}

  addPayment(amount: number) {
    const currentPayment = this.paymentSubject.value;
    this.paymentSubject.next(currentPayment + amount);
  }

  clearPayment() {
    this.paymentSubject.next(0);
  }

  getPayment(): number {
    return this.paymentSubject.value;
  }

  setPayment(amount: number) {
    this.paymentSubject.next(amount);
  }
}
