import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { LeftsidebarComponent } from '../../../components/leftsidebar/leftsidebar.component';

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

  productData = {
    milkTea: [
      { name: 'Okinawa', quantity: 40, price: 10000, date: '2024-12-01' },
      { name: 'Taro', quantity: 40, price: 10000, date: '2024-12-05' }
    ],
    bread: [
      { name: 'Ensaymada', quantity: 40, price: 1000, date: '2024-12-10' },
      { name: 'Pandesal', quantity: 40, price: 1000, date: '2024-12-12' }
    ],
    coffee: [
      { name: 'Americano', quantity: 40, price: 1000, date: '2024-12-11' },
      { name: 'Latte', quantity: 40, price: 1000, date: '2024-12-13' }
    ]
  };

  filteredData = { ...this.productData };

  startDate: string = '';
  endDate: string = '';

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    this.menuService.changeHeaderText('Reports');
  }

  // Method to filter data by date range
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
        start.setDate(start.getDate() - 30);
        break;
      case 'monthToDate':
        start.setDate(1);
        break;
      case 'lastMonth':
        start.setMonth(start.getMonth() - 1);
        start.setDate(1);
        end.setDate(0); // End date is the last day of the previous month
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

    this.filterByDateRange(start, end);
  }

  // Helper method to filter products by a date range
  filterByDateRange(startDate: Date, endDate: Date) {
    let filteredMilkTea = this.filterByDate(this.productData.milkTea, startDate, endDate);
    let filteredBread = this.filterByDate(this.productData.bread, startDate, endDate);
    let filteredCoffee = this.filterByDate(this.productData.coffee, startDate, endDate);

    this.filteredData = {
      milkTea: filteredMilkTea,
      bread: filteredBread,
      coffee: filteredCoffee
    };
  }

  // Helper method to filter individual products by date
  filterByDate(products: any[], startDate: Date, endDate: Date) {
    return products.filter(product => {
      const productDate = new Date(product.date);
      return productDate >= startDate && productDate <= endDate;
    });
  }

  // Method to download the report
  downloadReport() {
    console.log('Downloading report...');
  }
}
