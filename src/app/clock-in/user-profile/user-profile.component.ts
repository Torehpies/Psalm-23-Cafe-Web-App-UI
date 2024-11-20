import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isClockedIn: boolean = true; // Initial state: Clock-In
  user = {
    name: 'Juan Dela Cruz',
    role: 'Baker'
  };
  onButtonClick(): void {
    if (this.isClockedIn) {
      alert('You have been logged in');
    } else {
      alert('You have been logged out');
    }

    // Toggle the button state
    this.isClockedIn = !this.isClockedIn;
  }

  updateTime(): void {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
      const d = new Date();
      timeElement.innerHTML = d.toLocaleTimeString();
    }
  }

  ngAfterViewInit(): void {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }
  
  clockInData: { date: string; timeIn: string; timeOut: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadClockInData();
  }

  loadClockInData(): void {
    this.http.get<{ date: string; timeIn: string; timeOut: string }[]>('/api/worker-clockin-data')
      .subscribe(
        (data) => {
          this.clockInData = data;
        },
        (error) => {
          console.error('Error fetching clock-in data:', error);
        }
      );
  }
}
