import { Component, inject, OnInit } from '@angular/core';
import { LineItem } from '../../../../models/lineItem/lineItem.model';
import { OrderService } from '../../../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orderlist.component.html',
  styleUrl: './orderlist.component.css'
})
export class OrderlistComponent implements OnInit{
  
  lineItems: LineItem[] = [];
  totalAmount: number = 0;

  orderService = inject(OrderService);

  ngOnInit(): void {
    this.orderService.lineItems$.subscribe((lineItems) => {
      this.lineItems = lineItems;
    });
    this.orderService.totalAmount$.subscribe((totalAmount) => {
      this.totalAmount = totalAmount;
    });
  }

  removeLineItem(lineItem: LineItem): void {
    this.orderService.removeLineItem(lineItem);
  }

  getTotalAmount(): number {
    return this.totalAmount;
  }

}
