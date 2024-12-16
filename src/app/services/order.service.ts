import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LineItem } from '../models/lineItem/lineItem.model';
import { BehaviorSubject } from 'rxjs';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private lineItemsSubject = new BehaviorSubject<LineItem[]>([]);
  lineItems$ = this.lineItemsSubject.asObservable();

  private totalAmountSubject = new BehaviorSubject<number>(0);
  totalAmount$ = this.totalAmountSubject.asObservable();

  constructor(private http: HttpClient) {}

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

  clearLineItems(): void {
    this.lineItemsSubject.next([]);
    this.computeTotalAmount([]);
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

  sendOrder(totalAmount: number, paymentMethod: string, employeeId: string | null) {
    const order = {
      Date: new Date().toISOString(), // Add date and time
      TotalAmount: totalAmount,
      PaymentMethod: paymentMethod,
      EmployeeId: employeeId,
      products: this.lineItemsSubject.value.map(item => {
        const product: any = {
          _id: item._id,
          name: item.name,
          Quantity: item.quantity,
          price: item.price
        };
        if (item.selectedSize !== "") {
          product.size = item.selectedSize;
        }
        return product;
      })
    };

    return this.http.post(`${apiUrls.orderServiceApi}create`, order);
  }

}
