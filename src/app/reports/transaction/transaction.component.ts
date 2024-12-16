import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';

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

  // Sample Transaction Data
  transactionData = [
    { date: '2024-12-01', time: '10:00', paymentMethod: 'Cash', items: ['Milk Tea'], total: 100 },
    { date: '2024-12-02', time: '14:00', paymentMethod: 'Card', items: ['Bread', 'Coffee'], total: 250 },
    { date: '2024-12-03', time: '09:30', paymentMethod: 'Cash', items: ['Milk Tea', 'Bread'], total: 200 },
    { date: '2024-12-10', time: '16:45', paymentMethod: 'Card', items: ['Coffee'], total: 100 },
    { date: '2024-12-11', time: '12:30', paymentMethod: 'Cash', items: ['Bread'], total: 100 }
  ];

  filteredData = {
    transactions: [...this.transactionData],
  };

  startDate: string = '';
  endDate: string = '';

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe(status => {
      this.isMenuActive = status;
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
