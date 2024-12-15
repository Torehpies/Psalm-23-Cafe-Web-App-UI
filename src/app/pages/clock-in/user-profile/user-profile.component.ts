import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service'; // Import AuthService
import { AttendanceService } from '../../../services/attendance.service'; // Import AttendanceService
import { UserService } from '../../../services/user.service'; // Import UserService
import { Attendance } from '../../../models/attendance.model'; // Import Attendance model

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
    name: '',
    role: ''
  };

  clockInData: Attendance[] = []; // Use Attendance model
  currentClockInIndex: number | null = null; // Track the current record being edited
  lastClockInDate: string | null = null; // Track the last clock-in date

  constructor(
    private authService: AuthService,
    private attendanceService: AttendanceService, // Inject AttendanceService
    private userService: UserService // Inject UserService
  ) {} // Inject AuthService

  ngOnInit(): void {
    this.clockInData = []; // Initialize empty data
    this.authService.getUserName().subscribe(userName => {
      this.user.name = `${userName.firstName} ${userName.lastName}`;
    });
    const userRole = this.authService.getUserRole();
    if (userRole) {
      this.user.role = userRole;
    }

    const userId = this.authService.getUserId();
    if (userId) {
      this.attendanceService.getAttendance().subscribe(attendanceRecords => {
        this.clockInData = attendanceRecords.filter(record => record.userId === userId);
      });
    }
  }

  ngAfterViewInit(): void {
    this.updateTime(); // Start the live time
    setInterval(() => this.updateTime(), 1000); // Update time every second
  }

  onButtonClick(): void {
    const now = new Date();
    const formattedDate = this.formatDate(now); // Format as "Oct 17, 2024"
    const formattedTime = this.formatTime(now); // Format as "7:00 AM"

    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUsers().subscribe(response => {
        const user = response.data.find(u => u._id === userId);
        if (user) {
          if (this.isClockedIn) {
            // Clock-Out: Update the existing record
            if (this.currentClockInIndex !== null) {
              this.clockInData[this.currentClockInIndex].Timeout = formattedTime;
              const attendance = this.clockInData[this.currentClockInIndex];
              this.attendanceService.createAttendance(attendance).subscribe(response => {
                console.log('Attendance created:', response);
              });
              this.currentClockInIndex = null; // Reset after clocking out
              this.isClockedIn = !this.isClockedIn;
            }
          } else {
            // Clock-In: Create a new record
            this.clockInData.push({
              userId: user._id,
              Date: new Date(),
              TimeIn: formattedTime,
              Timeout: '' // Set Timeout as null
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
      });
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
      hour12: false,
      timeZone: 'Asia/Manila',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
