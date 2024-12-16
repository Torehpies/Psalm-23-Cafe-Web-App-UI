import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';

@Component({
  selector: 'app-financial-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LeftsidebarComponent,
  ],
  templateUrl: './financial-reports.component.html',
  styleUrls: ['./financial-reports.component.css'],
})
export class FinancialReportsComponent implements OnInit {
  isMenuActive: boolean = false;

  // Expenses and Sales Data
  expenses = [
    { item: 'Coffee Beans', quantity: '20 kg', amount: 120.0 },
    { item: 'Milk', quantity: '30 L', amount: 480.0 },
    { item: 'sugar', quantity: '30 L', amount: 480.0 }
  ];

  sales = [
    { item: 'Pandesal', quantity: '50 pc', amount: 500.0 },
    { item: 'Coffee', quantity: '10 pc', amount: 350.0 }
  ];

  // Calculate totals dynamically
  get totalExpenses(): number {
    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  get totalSales(): number {
    return this.sales.reduce((sum, sale) => sum + sale.amount, 0);
  }

  get profitLoss(): number {
    return this.totalSales - this.totalExpenses;
  }

  startDate: string = '';
  endDate: string = '';

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe(status => {
      this.isMenuActive = status;
    });
  }

  filterDataByRange(range: string) {
    console.log('Filter data by range', range);
  }

  filterData() {
    console.log('Filtering data...');
  }

  downloadReport() {
    console.log('Report download triggered');
  }
}
