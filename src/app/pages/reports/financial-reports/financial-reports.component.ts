import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../../services/menu.service';
import { LeftsidebarComponent } from '../../../components/leftsidebar/leftsidebar.component';
import { SuppliesService } from '../../../services/supplies.service';
import { ProductPerformanceService } from '../../../services/productPerformance.service';
import { AggregatedProductPerformance, ProductPerformance } from '../../../models/productPerformance.model';

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
  expenses: { item: string, quantity: number, amount: number, date: string }[] = [];
  sales: { productId: string, name: string, quantity: number, amount: number, date: string }[] = [];
  productPerformances: ProductPerformance[] = [];

  startDate: string = '';
  endDate: string = '';

  constructor(
    private menuService: MenuService,
    private suppliesService: SuppliesService,
    private productPerformanceService: ProductPerformanceService
  ) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe(status => {
      this.isMenuActive = status;
    });
    this.loadExpenses();
    this.loadProductPerformance();
  }

  loadExpenses() {
    this.suppliesService.getsupplyHistory().subscribe(histories => {
      console.log('Fetched stock histories:', histories); // Debugging statement
      this.expenses = histories.map((history: any) => ({
        item: history.ingredient._id.name || 'Unknown',
        quantity: history.Quantity,
        amount: history.Price,
        date: history.Date
      }));
      console.log('Loaded expenses:', this.expenses); // Debugging statement
      this.aggregateExpenses();
    }, error => {
      console.error('Error fetching stock histories:', error); // Debugging statement
    });
  }

  loadProductPerformance() {
    this.productPerformanceService.getProductPerformance().subscribe({
      next: (data) => {
        this.productPerformances = data.data;
        console.log('Loaded product performances:', this.productPerformances); // Debugging statement
        this.aggregateProductPerformance();
      },
      error: (error) => {
        console.error('Error fetching product performance data:', error);
      }
    });
  }

  aggregateExpenses() {
    const groupedHistories = this.expenses.reduce((acc: { [key: string]: any[] }, expense: any) => {
      const item = expense.item;
      if (!acc[item]) {
        acc[item] = [];
      }
      acc[item].push(expense);
      return acc;
    }, {});

    this.expenses = Object.values(groupedHistories).map(group => {
      const item = group[0].item;
      const quantity = group.reduce((sum, expense) => sum + expense.quantity, 0);
      const amount = group.reduce((sum, expense) => sum + expense.amount, 0);
      const date = group[0].date;
      return { item, quantity, amount, date };
    });

    console.log('Aggregated expenses:', this.expenses); // Debugging statement
  }

  aggregateProductPerformance() {
    const aggregatedData: { [key: string]: { productId: string, name: string, quantity: number, amount: number, date: string } } = {};

    this.productPerformances.forEach(performance => {
      performance.categories.forEach(category => {
        category.products.forEach(product => {
          if (!aggregatedData[product.productId]) {
            aggregatedData[product.productId] = {
              productId: product.productId,
              name: product.name,
              quantity: 0,
              amount: 0,
              date: performance.date
            };
          }
          aggregatedData[product.productId].quantity += product.quantity;
          aggregatedData[product.productId].amount += product.price * product.quantity;
        });
      });
    });

    this.sales = Object.values(aggregatedData);
    console.log('Aggregated product performance:', this.sales);
  }

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

  filterDataByRange(range: string) {
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
        start.setDate(start.getDate() - 30);
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
    console.log('Filtering from:', startDate, 'to:', endDate); // Debugging statement

    const filteredExpenses = this.expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      expenseDate.setHours(0, 0, 0, 0);
      console.log('Checking expense date:', expenseDate); // Debugging statement
      return expenseDate >= startDate && expenseDate <= endDate;
    });

    const filteredSales = this.productPerformances.filter(performance => {
      const performanceDate = new Date(performance.date);
      performanceDate.setHours(0, 0, 0, 0);
      console.log('Checking performance date:', performanceDate); // Debugging statement
      return performanceDate >= startDate && performanceDate <= endDate;
    });

    this.aggregateFilteredData(filteredExpenses, filteredSales);
  }

  aggregateFilteredData(filteredExpenses: any[], filteredSales: ProductPerformance[]) {
    // Aggregate expenses
    const groupedHistories = filteredExpenses.reduce((acc: { [key: string]: any[] }, expense: any) => {
      const item = expense.item;
      if (!acc[item]) {
        acc[item] = [];
      }
      acc[item].push(expense);
      return acc;
    }, {});

    this.expenses = Object.values(groupedHistories).map(group => {
      const item = group[0].item;
      const quantity = group.reduce((sum, expense) => sum + expense.quantity, 0);
      const amount = group.reduce((sum, expense) => sum + expense.amount, 0);
      const date = group[0].date;
      return { item, quantity, amount, date };
    });

    // Aggregate sales
    const aggregatedData: { [key: string]: { productId: string, name: string, quantity: number, amount: number, date: string } } = {};

    filteredSales.forEach(performance => {
      performance.categories.forEach(category => {
        category.products.forEach(product => {
          if (!aggregatedData[product.productId]) {
            aggregatedData[product.productId] = {
              productId: product.productId,
              name: product.name,
              quantity: 0,
              amount: 0,
              date: performance.date
            };
          }
          aggregatedData[product.productId].quantity += product.quantity;
          aggregatedData[product.productId].amount += product.price * product.quantity;
        });
      });
    });

    this.sales = Object.values(aggregatedData);

    console.log('Filtered and aggregated expenses:', this.expenses); // Debugging statement
    console.log('Filtered and aggregated sales:', this.sales); // Debugging statement
  }

  filterData() {
    if (!this.startDate || !this.endDate) return;

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    start.setHours(0, 0, 0, 0); // Ensure the start date includes the entire day
    end.setHours(23, 59, 59, 999); // Ensure the end date includes the entire day

    if (end < start) {
      alert('The "To" date cannot be earlier than the "From" date.');
      return;
    }

    console.log('Filtering data from:', start, 'to:', end); // Debugging statement
    this.filterByDateRange(start, end);
  }

  downloadReport() {
    const expensesCsv = this.convertToCSV(this.expenses, ['item', 'quantity', 'amount']);
    const salesCsv = this.convertToCSV(this.sales, ['name', 'quantity', 'amount']);
    const csvData = `Expenses\n${expensesCsv}\n\nSales\n${salesCsv}`;
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'financial_report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  convertToCSV(data: any[], headers: string[]) {
    const header = headers.join(',');
    const rows = data.map(row => headers.map(header => row[header]).join(','));
    return [header, ...rows].join('\n');
  }
}
