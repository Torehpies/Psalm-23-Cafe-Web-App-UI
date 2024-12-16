import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'app-weekly',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css'],
})
export class WeeklyComponent implements OnInit, AfterViewInit {

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
    const ctx = document.getElementById('weeklySalesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
          label: 'Sales per Day',
          data: [50, 60, 70, 80, 90, 100, 110],
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
