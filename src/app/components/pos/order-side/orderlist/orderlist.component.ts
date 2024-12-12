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

  orderService = inject(OrderService);

  ngOnInit(): void {
    this.orderService.lineItems$.subscribe((lineItems) => {
      this.lineItems = lineItems;
    });
  }

  removeLineItem(lineItem: LineItem): void {
    this.orderService.removeLineItem(lineItem);
  }

  getTotalAmount(): number {
    return this.lineItems.reduce((acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 0), 0);
  }
}
