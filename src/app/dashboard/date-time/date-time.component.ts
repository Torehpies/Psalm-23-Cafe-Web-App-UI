import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-time',
  standalone: true,
  imports: [],
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css'], // Fixed typo: styleUrl -> styleUrls
})
export class DateTimeComponent implements OnInit {
  currentDate: string = '';
  currentTime: string = '';

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => {
      this.updateDateTime();
    }, 1000); // Update every second
  }

  private updateDateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.currentDate = now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  }
}
