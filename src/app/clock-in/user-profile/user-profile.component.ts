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
  onButtonClick(): void {  // Toggle the button state
    this.isClockedIn = !this.isClockedIn;
  }

  updateTime(): void {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
      const d = new Date();
      let hours = d.getHours();
      const minutes = d.getMinutes().toString().padStart(2, '0'); // Format minutes with leading zero
      const period = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM
  
      // Convert to 12-hour format
      hours = hours % 12 || 12; // 0 becomes 12
  
      timeElement.innerHTML = `${hours}:${minutes} ${period}`;
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
