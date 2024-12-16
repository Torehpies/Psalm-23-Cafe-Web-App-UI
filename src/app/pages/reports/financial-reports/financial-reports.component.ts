import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../../services/menu.service';
import { LeftsidebarComponent } from '../../../components/leftsidebar/leftsidebar.component';
import { SuppliesService } from '../../../services/supplies.service';

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
  expenses: { item: string, quantity: number, amount: number }[] = [];

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

  constructor(private menuService: MenuService, private suppliesService: SuppliesService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe(status => {
      this.isMenuActive = status;
    });
    this.loadExpenses();
  }

  loadExpenses() {
    this.suppliesService.getsupplyHistory().subscribe(histories => {
      console.log('Fetched stock histories:', histories); // Debugging statement
      const groupedHistories = histories.reduce((acc: { [key: string]: any[] }, history: any) => {
        const ingredientId = history.ingredient._id._id; // Access the needed ID inside the ingredient object
        if (!acc[ingredientId]) {
          acc[ingredientId] = [];
        }
        acc[ingredientId].push(history);
        return acc;
      }, {});
      console.log('Grouped stock histories:', groupedHistories); // Debugging statement
      this.expenses = Object.values(groupedHistories).map(group => {
        const { ingredient } = group[0];
        const item = ingredient._id.name || 'Unknown';
        const quantity = group.reduce((sum, history) => sum + history.Quantity, 0);
        const amount = group.reduce((sum, history) => sum + history.Price, 0);
        return { item, quantity, amount };
      });
      console.log('Aggregated expenses:', this.expenses); // Debugging statement
    }, error => {
      console.error('Error fetching stock histories:', error); // Debugging statement
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
