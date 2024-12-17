import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../../services/menu.service';
import { LeftsidebarComponent } from '../../../components/leftsidebar/leftsidebar.component';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LeftsidebarComponent,
  ],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  isMenuActive: boolean = false;

  transactionData: { date: string, time: string, paymentMethod: string, items: string[], total: number }[] = [];

  filteredData = {
    transactions: [...this.transactionData],
  };

  startDate: string = '';
  endDate: string = '';

  constructor(private menuService: MenuService, private orderService: OrderService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe(status => {
      this.isMenuActive = status;
    });

    this.orderService.getOrders().subscribe((orders: any) => {
      console.log('Fetched orders:', orders); // Debugging line
      this.transactionData = orders.map((order: any) => ({
        date: new Date(order.Date).toLocaleDateString(),
        time: new Date(order.Date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        paymentMethod: order.PaymentMethod,
        items: order.products.map((product: any) => product.name),
        total: order.TotalAmount
      }));
      this.filteredData.transactions = [...this.transactionData];
    });

    // Do NOT change the header text here
  }

  filterDataByDateRange(range: string) {
    let start = new Date();
    let end = new Date();

    switch (range) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case 'last30days':
        start.setDate(end.getDate() - 7);
        break;
      case 'monthToDate':
        start.setDate(1);
        break;
      case 'lastMonth':
        start.setMonth(start.getMonth() - 1);
        start.setDate(1);
        end.setDate(0);
        break;
      default:
        return;
    }

    this.filterByDateRange(start, end);
  }

  filterByDateRange(startDate: Date, endDate: Date) {
    this.filteredData.transactions = this.transactionData.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }

  filterDataByCustomDateRange() {
    if (!this.startDate || !this.endDate) return;

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    this.filterByDateRange(start, end);
  }

  downloadReport() {
    console.log('Downloading report...');
  }

  handleTransactionButtonClick() {
    console.log('Transaction button clicked!');
  }
}
