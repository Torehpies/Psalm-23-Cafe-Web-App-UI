import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { LeftsidebarComponent } from '../../../components/leftsidebar/leftsidebar.component';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-weekly',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LeftsidebarComponent,
  ],
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css'],
})
export class WeeklyComponent implements AfterViewInit {
  isMenuActive: boolean = false;
  activeButton: string = 'weekly';
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

    const canvas = document.getElementById('weeklyChart') as HTMLCanvasElement;

    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Unable to get 2D context for the canvas.');
      return;
    }

    // Chart data and configuration for weekly data
    const weeklyData = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          label: 'Weekly Sales',
          data: [100, 120, 150, 170, 200, 220, 180], // Example data for each day
          backgroundColor: '#fcbf49',
          borderRadius: 5,
        },
      ],
    };

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: weeklyData,
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

    console.log('Weekly chart initialized successfully');
  }
}
