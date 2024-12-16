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
  expenses: { item: string, quantity: number, amount: number }[] = [];

  
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
  
  constructor(
    private menuService: MenuService,
    private suppliesService: SuppliesService,
    private productPerformanceService: ProductPerformanceService) { }
    
    
  sales: AggregatedProductPerformance[] = [];
  productPerformances: ProductPerformance[] = [];

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

  loadProductPerformance() {
    this.productPerformanceService.getProductPerformance().subscribe({
      next: (data) => {
        this.productPerformances = data.data;
        this.aggregateProductPerformance();
        console.log('Product performance data:', data);
      },
      error: (error) => {
        console.error('Error fetching product performance data:', error);
      }
    });
  }

  aggregateProductPerformance() {
    const aggregatedData: { [key: string]: AggregatedProductPerformance } = {};

    this.productPerformances.forEach(performance => {
      performance.products.forEach(product => {
        if (!aggregatedData[product.productId]) {
          aggregatedData[product.productId] = {
            productId: product.productId,
            name: product.name,
            quantity: 0,
            amount: 0
          };
        }
        aggregatedData[product.productId].quantity += product.quantity;
        aggregatedData[product.productId].amount += product.price * product.quantity;
      });
    });

    this.sales = Object.values(aggregatedData);
    console.log('Aggregated product performance:', this.sales);
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
