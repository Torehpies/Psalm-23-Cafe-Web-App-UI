import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  isClockedIn: boolean = true; // Initial state: Clock-In
  user = {
    name: 'Juan Dela Cruz',
    role: 'Baker'
  };

  clockInData: { date: string; timeIn: string | null; timeOut: string | null }[] = [];
  currentClockInIndex: number | null = null; // Track the current record being edited

  constructor() {}

  ngOnInit(): void {
    this.clockInData = []; // Initialize empty data
  }

  ngAfterViewInit(): void {
    this.updateTime(); // Start the live time
    setInterval(() => this.updateTime(), 1000); // Update time every second
  }

  onButtonClick(): void {
    const now = new Date();
    const formattedDate = this.formatDate(now); // Format as "Oct 17, 2024"
    const formattedTime = this.formatTime(now); // Format as "7:00 AM"

    if (this.isClockedIn) {
      // Clock-In: Create a new record
      this.clockInData.push({
        date: formattedDate,
        timeIn: formattedTime,
        timeOut: null,
      });
      this.currentClockInIndex = this.clockInData.length - 1; // Save the index of the new record
    } else if (this.currentClockInIndex !== null) {
      // Clock-Out: Update the existing record
      this.clockInData[this.currentClockInIndex].timeOut = formattedTime;
      this.currentClockInIndex = null; // Reset after clocking out
    }

    // Toggle the button state
    this.isClockedIn = !this.isClockedIn;
  }

  // Live time display
  updateTime(): void {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
      const now = new Date();
      const formattedTime = this.formatTime(now);
      timeElement.innerHTML = formattedTime; // Update the time element
    }
  }

  // Helper method to format the date
  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'Asia/Manila',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  // Helper method to format the time
  private formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Manila',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
