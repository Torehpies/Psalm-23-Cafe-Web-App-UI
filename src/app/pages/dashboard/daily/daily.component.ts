import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ProductPerformanceService } from '../../../services/productPerformance.service';
import { ProductPerformance, Category } from '../../../models/productPerformance.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {
  totalCustomers: number = 0;
  products: ProductPerformance[] = [];
  aggregatedProducts: ProductPerformance[] = [];

  constructor(private orderService: OrderService, private productPerformanceService: ProductPerformanceService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders: any) => {
      console.log('Fetched orders:', orders); // Debugging line
      const today = new Date().toISOString().split('T')[0];
      const todayOrders = orders.filter((order: any) => order.Date.split('T')[0] === today);
      this.totalCustomers = todayOrders.length;
      this.productPerformanceService.getProductPerformance().subscribe((response: { data: ProductPerformance[] }) => {
        console.log('Fetched product performance data:', response); // Debugging line
        this.products = response.data;
        this.filterByToday();
        console.log('Aggregated products:', this.aggregatedProducts); // Debugging line
      });
      console.log('Total customers:', this.totalCustomers); // Debugging line
    });
  }

  filterByToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const filtered = this.products.filter(performance => {
      const performanceDate = new Date(performance.date);
      performanceDate.setHours(0, 0, 0, 0);
      return performanceDate >= today && performanceDate <= endOfDay;
    });
    this.aggregatedProducts = this.aggregateData(filtered);
  }

  aggregateData(data: ProductPerformance[]): ProductPerformance[] {
    const aggregated: { [key: string]: ProductPerformance } = {};

    data.forEach(performance => {
      performance.categories.forEach((category: Category) => {
        if (!aggregated[category.category]) {
          aggregated[category.category] = {
            _id: '',
            date: '',
            total: 0,
            categories: [{ category: category.category, products: [] }],
            products: []
          };
        }
        category.products.forEach((product: any) => {
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
}
