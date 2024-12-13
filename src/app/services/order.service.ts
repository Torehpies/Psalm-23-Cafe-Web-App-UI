import { Injectable } from '@angular/core';
import { LineItem } from '../models/lineItem/lineItem.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private lineItemsSubject = new BehaviorSubject<LineItem[]>([]);
  lineItems$ = this.lineItemsSubject.asObservable();

  private totalAmountSubject = new BehaviorSubject<number>(0);
  totalAmount$ = this.totalAmountSubject.asObservable();

  addLineItem(lineItem: LineItem): void {
    const currentLineItems = this.lineItemsSubject.value;
    const newLineItems = [...currentLineItems, lineItem];
    this.lineItemsSubject.next(newLineItems);
    this.computeTotalAmount(newLineItems);
  }

  removeLineItem(lineItem: LineItem): void {
    const currentLineItems = this.lineItemsSubject.value;
    const newLineItems = currentLineItems.filter((item) => item !== lineItem);
    this.lineItemsSubject.next(newLineItems);
    this.computeTotalAmount(newLineItems);
  }

  setTotalAmount(amount: number) {
    this.totalAmountSubject.next(amount);
  }

  getTotalAmount(): number {
    return this.totalAmountSubject.value;
  }

  private computeTotalAmount(lineItems: LineItem[]): void {
    const total = lineItems.reduce((acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 0), 0);
    this.totalAmountSubject.next(total);
  }

}
