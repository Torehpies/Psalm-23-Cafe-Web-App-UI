import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'app-monthly',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css'],
})
export class MonthlyComponent implements OnInit, AfterViewInit {

  isMenuActive: boolean = false;
  
    constructor(private menuService: MenuService) {}
  
    ngOnInit() {
      this.menuService.isMenuActive$.subscribe((status) => {
        this.isMenuActive = status;
      });
  
    }

  ngAfterViewInit() {
    this.initializeChart();
  }

  initializeChart() {
    const ctx = document.getElementById('monthlySalesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'Sales per Month',
          data: [120, 190, 300, 500, 200, 300, 100, 150, 220, 300, 250, 180],
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
