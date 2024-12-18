import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { LeftsidebarComponent } from '../../../components/leftsidebar/leftsidebar.component';
import { ProductPerformanceService } from '../../../services/productPerformance.service';
import { ProductPerformance, Category } from '../../../models/productPerformance.model';

@Component({
  selector: 'app-product-performance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LeftsidebarComponent,
  ],
  templateUrl: './product-performance.component.html',
  styleUrls: ['./product-performance.component.css'],
})
export class ProductPerformanceComponent implements OnInit {
  isMenuActive: boolean = false;

  productData: ProductPerformance[] = [];
  filteredData: ProductPerformance[] = [];

  startDate: string = '';
  endDate: string = '';

  constructor(
    private menuService: MenuService,
    private productPerformanceService: ProductPerformanceService
  ) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    this.menuService.changeHeaderText('Reports');

    this.productPerformanceService.getProductPerformance().subscribe((response) => {
      console.log('Fetched data:', response); // Debugging statement
      this.productData = response.data;
      this.filteredData = this.aggregateData(this.productData);
    });
  }

  // Method to filter data by date range
  filterDataByDateRange(range: string) {
    let start = new Date();
    let end = new Date();

    switch (range) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        this.filterByToday();
        return;
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
        return; // No filtering applied
    }

    this.filterByDateRange(start, end);
  }

  // Method to filter data based on custom date range
  filterDataByCustomDateRange() {
    if (!this.startDate || !this.endDate) return; // Return if no dates are selected

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

  // Helper method to filter products by a date range
  filterByDateRange(startDate: Date, endDate: Date) {
    const filtered = this.productData.filter(performance => {
      const performanceDate = new Date(performance.date);
      performanceDate.setHours(0, 0, 0, 0);
      return performanceDate >= startDate && performanceDate <= endDate;
    });
    this.filteredData = this.aggregateData(filtered);
  }

  // Method to filter data for today
  filterByToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const filtered = this.productData.filter(performance => {
      const performanceDate = new Date(performance.date);
      performanceDate.setHours(0, 0, 0, 0);
      return performanceDate >= today && performanceDate <= endOfDay;
    });
    this.filteredData = this.aggregateData(filtered);
  }

  // Method to aggregate data
  aggregateData(data: ProductPerformance[]): ProductPerformance[] {
    const aggregated: { [key: string]: ProductPerformance } = {};

    data.forEach(performance => {
      performance.categories.forEach(category => {
        if (!aggregated[category.category]) {
          aggregated[category.category] = {
            _id: '',
            date: '',
            total: 0,
            categories: [{ category: category.category, products: [] }],
            products: []
          };
        }
        category.products.forEach(product => {
          const existingProduct = aggregated[category.category].categories[0].products.find(p => p.productId === product.productId);
          if (existingProduct) {
            existingProduct.quantity += product.quantity;
          } else {
            aggregated[category.category].categories[0].products.push({ ...product });
          }
        });
      });
    });

    return Object.values(aggregated);
  }

  // Method to download the report
  downloadReport() {
    console.log('Downloading report...');
  }
}
