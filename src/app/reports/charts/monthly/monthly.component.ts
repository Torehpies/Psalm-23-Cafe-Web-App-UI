import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { LeftsidebarComponent } from '../../../components/leftsidebar/leftsidebar.component';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-monthly',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LeftsidebarComponent,
  ],
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css'],
})
export class MonthlyComponent implements AfterViewInit {
  isMenuActive: boolean = false;
  activeButton: string = 'monthly';
  chart: Chart | undefined;

  constructor(
    private menuService: MenuService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  navigateTo(path: string) {
    console.log('Navigating to path:', path);
    this.router.navigate([`/reports/${path}`]);
  }

  isButtonActive(buttonName: string): boolean {
    return this.activeButton === buttonName;
  }

  initializeChart(): void {
    // Register Chart.js components (for Chart.js v4+)
    Chart.register(...registerables);

    const canvas = document.getElementById('monthlyChart') as HTMLCanvasElement;

    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Unable to get 2D context for the canvas.');
      return;
    }

    // Chart data and configuration for January to December
    const monthlyData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Monthly Sales',
          data: [320, 400, 500, 450, 600, 700, 750, 800, 650, 600, 550, 500], // Example monthly data
          backgroundColor: '#fcbf49',
          borderRadius: 5,
        },
      ],
    };

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: monthlyData,
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
        plugins: {
          legend: { display: false },
        },
      },
    });

    console.log('Monthly chart initialized successfully');
  }
}
