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
      case 'yesterday':
        start.setDate(start.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(end.getDate() - 1);
        end.setHours(23, 59, 59, 999);
        break;
      case 'last30days':
        start.setDate(end.getDate() - 30);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case 'monthToDate':
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case 'lastMonth':
        start.setMonth(start.getMonth() - 1);
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
        break;
      default:
        return;
    }

    this.filterByDateRange(start, end);
  }

  filterByDateRange(startDate: Date, endDate: Date) {
    this.filteredData.transactions = this.transactionData.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      transactionDate.setHours(0, 0, 0, 0);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }

  filterDataByCustomDateRange() {
    if (!this.startDate || !this.endDate) return;

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    start.setHours(0, 0, 0, 0); // Ensure the start date includes the entire day
    end.setHours(23, 59, 59, 999); // Ensure the end date includes the entire day

    if (end < start) {
      alert('The "To" date cannot be earlier than the "From" date.');
      return;
    }

    this.filterByDateRange(start, end);
  }

  downloadReport() {
    const csvData = this.convertToCSV(this.filteredData.transactions);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'transactions_report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  convertToCSV(data: any[]) {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [header, ...rows].join('\n');
  }

  handleTransactionButtonClick() {
    console.log('Transaction button clicked!');
  }
}
