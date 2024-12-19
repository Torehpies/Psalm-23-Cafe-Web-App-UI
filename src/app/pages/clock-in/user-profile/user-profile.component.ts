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
  isLocked: boolean = false; // Initial state: Not locked
  user = {
    name: '',
    role: ''
  };

  currentTime: Date = new Date();
  clockInData: Attendance[] = []; // Use Attendance model
  currentClockInIndex: number | null = null; // Track the current record being edited
  lastClockInDate: string | null = null; // Track the last clock-in date

  constructor(
    private authService: AuthService,
    private attendanceService: AttendanceService, // Inject AttendanceService
    private userService: UserService // Inject UserService
  ) { } // Inject AuthService

  ngOnInit(): void {
    this.authService.getUserName().subscribe(userName => {
      this.user.name = `${userName.firstName} ${userName.lastName}`;
    });
    const userRole = this.authService.getUserRole();
    if (userRole) {
      this.user.role = userRole;
    }

    const userId = this.authService.getUserId();
    if (userId) {
      this.attendanceService.getAttendanceByUserId(userId).subscribe(attendanceRecords => {
        this.clockInData = attendanceRecords;   
        this.checkIfClockedInToday();
        
      })
    }
  }
      
  

  checkIfClockedInToday(): void {
    const today = new Date();
    const todayRecord = this.clockInData.find(record => {
      const recordDate = new Date(record.TimeIn);
      return recordDate.getDate() === today.getDate() &&
             recordDate.getMonth() === today.getMonth() &&
             recordDate.getFullYear() === today.getFullYear();
    });

    if (todayRecord) {
      this.isClockedIn = !todayRecord.TimeOut;
      this.isLocked = !!todayRecord.TimeOut;
    } else {
      this.isClockedIn = false;
      this.isLocked = false;
    }
  }

  ngAfterViewInit(): void {
    this.updateTime(); // Start the live time
    setInterval(() => this.updateTime(), 1000); // Update time every second
  }

  onButtonClick(): void {
    const now = new Date();
    const userId = this.authService.getUserId();

    if (userId) {
      if (this.isClockedIn) {
        // Clock-Out: Update the existing record
        const todayRecord = this.clockInData.find(record => {
          const recordDate = new Date(record.Date);
          return recordDate.getDate() === now.getDate() &&
                 recordDate.getMonth() === now.getMonth() &&
                 recordDate.getFullYear() === now.getFullYear();
        });

        if (todayRecord && todayRecord._id) {
          const payload = {userId: userId ,TimeOut: now.toISOString() };
          console.log(payload)
          this.attendanceService.timeOut(todayRecord._id, payload).subscribe(
            response => {
              console.log('Attendance updated:', response);
              this.isClockedIn = false;
              this.isLocked = true;
              
            },
            error => {
              console.error('Error updating attendance:', error);
              if (error.error instanceof ErrorEvent) {
                console.error('Error Event:', error.error.message);
              } else {
                console.error(`Error Status: ${error.status}\nMessage: ${error.message}`);
              }
              this.reloadPage(); // Reload the page after success
            }
          );
        } else {
          console.error('No attendance record found for today');
        }
      } else {
        // Clock-In: Create a new record
        const payload = { userId: userId, TimeIn: now.toISOString() };
        console.log("timeIn", payload)
        this.attendanceService.timeIn(payload).subscribe(
          response => {
            console.log('Attendance created:', response);
            this.isClockedIn = true;
            this.clockInData.push(response);
            
          },
          error => {
            console.error('Error creating attendance:', error);
            if (error.error instanceof ErrorEvent) {
              console.error('Error Event:', error.error.message);
            } else {
              console.error(`Error Status: ${error.status}\nMessage: ${error.message}`);
            }
            this.reloadPage(); // Reload the page after success
          }
        );
      }
    } else {
      console.error('User ID is null');
    }
  }

  reloadPage() {
    window.location.reload();
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
