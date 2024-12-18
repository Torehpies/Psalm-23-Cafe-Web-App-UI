import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../../../services/menu.service';
import { Chart } from 'chart.js/auto';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-hourly',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css'],
})
export class HourlyComponent implements OnInit, AfterViewInit {
  isMenuActive: boolean = false;
  selectedDate: string = this.formatDateInput(new Date());
  displayDate: string = this.formatDate(new Date());
  hourlySalesData: number[] = [];
  ordersData: { date: string, hour: number, total: number }[] = [];
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

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  formatDateInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  fetchData() {
    this.orderService.getOrders().subscribe((orders: any) => {
      this.ordersData = orders.map((order: any) => ({
        date: new Date(order.Date).toISOString().split('T')[0],
        hour: new Date(order.Date).getHours(),
        total: order.TotalAmount
      }));
      this.filterDataByDate();
    });
  }

  filterDataByDate() {
    const selectedDateISO = new Date(this.selectedDate).toISOString().split('T')[0];
    const filteredOrders = this.ordersData.filter(order => order.date === selectedDateISO);
    const hourlySales = new Array(24).fill(0);
    filteredOrders.forEach(order => {
      if (order.hour >= 7 && order.hour <= 22) {
        hourlySales[order.hour] += order.total;
      }
    });
    this.hourlySalesData = hourlySales.slice(7, 23); // Only keep data from 7 AM to 10 PM
    this.initializeChart();
  }

  onDateChange(event: any) {
    this.selectedDate = event.target.value;
    this.displayDate = this.formatDate(new Date(this.selectedDate));
    this.filterDataByDate();
  }

  changeDay(offset: number) {
    const currentDate = new Date(this.selectedDate);
    currentDate.setDate(currentDate.getDate() + offset);
    this.selectedDate = this.formatDateInput(currentDate);
    this.displayDate = this.formatDate(currentDate);
    this.filterDataByDate();
  }

  isNextDayDisabled(): boolean {
    const today = new Date();
    const selectedDate = new Date(this.selectedDate);
    return selectedDate.toDateString() === today.toDateString();
  }

  initializeChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    const ctx = document.getElementById('hourlySalesChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'],
        datasets: [{
          label: 'Sales per Hour',
          data: this.hourlySalesData,
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
