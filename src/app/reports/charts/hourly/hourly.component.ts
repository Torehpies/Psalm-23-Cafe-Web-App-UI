import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { LeftsidebarComponent } from '../../../components/leftsidebar/leftsidebar.component';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-hourly',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LeftsidebarComponent,
  ],
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css'],
})
export class HourlyComponent implements AfterViewInit {
  isMenuActive: boolean = false;
  activeButton: string = 'hourly';
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

    const canvas = document.getElementById('hourlyChart') as HTMLCanvasElement;

    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Unable to get 2D context for the canvas.');
      return;
    }

    // Chart data and configuration
    const sampleData = {
      labels: ['5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],
      datasets: [
        {
          label: 'Sales',
          data: [10, 12, 15, 20, 25, 30, 28, 32, 30, 28, 32, 34, 30, 28, 24, 20],
          backgroundColor: '#fcbf49',
          borderRadius: 5,
        },
      ],
    };

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: sampleData,
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

    console.log('Chart initialized successfully');
  }
}
