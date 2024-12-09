import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  isClockedIn: boolean = false; // Initial state: Clock-In
  user = {
    name: 'Juan Dela Cruz',
    role: 'Baker'
  };

  clockInData: { date: string; timeIn: string | null; timeOut: string | null }[] = [];
  currentClockInIndex: number | null = null; // Track the current record being edited
  lastClockInDate: string | null = null; // Track the last clock-in date

  constructor() {}

  ngOnInit(): void {
    this.clockInData = []; // Initialize empty data
  }

  ngAfterViewInit(): void {
    this.updateTime(); // Start the live time
    setInterval(() => this.updateTime(), 1000); // Update time every second
    this.checkButtonDisable(); // Check if the button should be disabled on load
  }

  onButtonClick(): void {
    const now = new Date();
    const formattedDate = this.formatDate(now); // Format as "Oct 17, 2024"
    const formattedTime = this.formatTime(now); // Format as "7:00 AM"

    if (this.isClockedIn) {
      // Clock-Out: Update the existing record
      if (this.currentClockInIndex !== null) {
        this.clockInData[this.currentClockInIndex].timeOut = formattedTime;
        this.currentClockInIndex = null; // Reset after clocking out
        this.isClockedIn = !this.isClockedIn;
        this.checkButtonDisable();
      }
    } else {
      if (this.lastClockInDate === formattedDate) {
        alert("You can't time in again today!");
        this.checkButtonDisable();
        return;
      }
      // Clock-In: Create a new record
      this.clockInData.push({
        date: formattedDate,
        timeIn: formattedTime,
        timeOut: null,
      });
      this.currentClockInIndex = this.clockInData.length - 1; // Save the index of the new record
      this.lastClockInDate = formattedDate; // Set the last clock-in date

      // Ensure Angular change detection picks up the update
      this.clockInData = [...this.clockInData];
      
      // Toggle the button state
      this.isClockedIn = !this.isClockedIn;
    }

    // Log the current state of clockInData
    console.log(this.clockInData);
  }



  //disable button

  // Check if the button should be disabled based on the last clock-in date
  checkButtonDisable(): void {
    const now = new Date();
    const formattedDate = this.formatDate(now);
    const button = document.querySelector('button');

    if (button) {
      if (this.lastClockInDate === formattedDate && !this.isClockedIn) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    }
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
