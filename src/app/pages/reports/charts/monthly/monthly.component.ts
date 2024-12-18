import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { MenuService } from '../../../../services/menu.service';
import { OrderService } from '../../../../services/order.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-monthly',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css'],
})
export class MonthlyComponent implements OnInit, AfterViewInit {
  isMenuActive: boolean = false;
  selectedYear: string = new Date().getFullYear().toString();
  monthlySalesData: number[] = [];
  ordersData: { date: string, month: number, total: number }[] = [];
  chart: any;

  constructor(private menuService: MenuService, private orderService: OrderService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });
    this.fetchData();
  }

  ngAfterViewInit() {
    this.initializeChart();
  }

  fetchData() {
    this.orderService.getOrders().subscribe((orders: any) => {
      this.ordersData = orders.map((order: any) => ({
        date: new Date(order.Date).toISOString().split('T')[0],
        month: new Date(order.Date).getMonth(),
        total: order.TotalAmount
      }));
      this.filterDataByYear();
    });
  }

  filterDataByYear() {
    const year = parseInt(this.selectedYear, 10);
    const filteredOrders = this.ordersData.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate.getFullYear() === year;
    });

    const monthlySales = new Array(12).fill(0);
    filteredOrders.forEach(order => {
      monthlySales[order.month] += order.total;
    });
    this.monthlySalesData = monthlySales;
    this.initializeChart();
  }

  onYearChange(event: any) {
    this.selectedYear = event.target.value;
    this.filterDataByYear();
  }

  changeYear(offset: number) {
    const year = parseInt(this.selectedYear, 10) + offset;
    this.selectedYear = year.toString();
    this.filterDataByYear();
  }

  isNextYearDisabled(): boolean {
    const currentYear = new Date().getFullYear();
    return parseInt(this.selectedYear, 10) >= currentYear;
  }

  initializeChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    const ctx = document.getElementById('monthlySalesChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'Sales per Month',
          data: this.monthlySalesData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
