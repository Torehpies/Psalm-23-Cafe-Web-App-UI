import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { MenuService } from '../../../../services/menu.service';
import { OrderService } from '../../../../services/order.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weekly',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css'],
})
export class WeeklyComponent implements OnInit, AfterViewInit {

  isMenuActive: boolean = false;
  selectedWeek: string = this.getCurrentWeek();
  weeklySalesData: number[] = [];
  ordersData: { date: string, day: number, total: number }[] = [];
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

  getCurrentWeek(): string {
    const now = new Date();
    const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
    return `${this.formatDate(firstDayOfWeek)} - ${this.formatDate(lastDayOfWeek)}`;
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  fetchData() {
    this.orderService.getOrders().subscribe((orders: any) => {
      this.ordersData = orders.map((order: any) => ({
        date: new Date(order.Date).toISOString().split('T')[0],
        day: new Date(order.Date).getDay(),
        total: order.TotalAmount
      }));
      this.filterDataByWeek();
    });
  }

  filterDataByWeek() {
    const [startDate, endDate] = this.selectedWeek.split(' - ').map(date => new Date(date));
    const filteredOrders = this.ordersData.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= startDate && orderDate <= endDate;
    });

    const weeklySales = new Array(7).fill(0);
    filteredOrders.forEach(order => {
      weeklySales[order.day] += order.total;
    });
    this.weeklySalesData = weeklySales;
    this.initializeChart();
  }

  onWeekChange(event: any) {
    this.selectedWeek = event.target.value;
    this.filterDataByWeek();
  }

  changeWeek(offset: number) {
    const [startDate] = this.selectedWeek.split(' - ').map(date => new Date(date));
    startDate.setDate(startDate.getDate() + offset * 7);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    this.selectedWeek = `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`;
    this.filterDataByWeek();
  }

  isNextWeekDisabled(): boolean {
    const today = new Date();
    const [startDate, endDate] = this.selectedWeek.split(' - ').map(date => new Date(date));
    return today >= startDate && today <= endDate;
  }

  initializeChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    const ctx = document.getElementById('weeklySalesChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
          label: 'Sales per Day',
          data: this.weeklySalesData,
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
