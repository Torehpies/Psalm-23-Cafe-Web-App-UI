import { Injectable } from '@angular/core';
import { LineItem } from '../models/lineItem/lineItem.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private lineItemsSubject = new BehaviorSubject<LineItem[]>([]);
  lineItems$ = this.lineItemsSubject.asObservable();

  addLineItem(lineItem: LineItem): void {
    const currentLineItems = this.lineItemsSubject.value;
    this.lineItemsSubject.next([...currentLineItems, lineItem]);
  }

  removeLineItem(lineItem: LineItem): void {
    const currentLineItems = this.lineItemsSubject.value;
    const newLineItems = currentLineItems.filter((item) => item !== lineItem);
    this.lineItemsSubject.next(newLineItems);
  }
}
