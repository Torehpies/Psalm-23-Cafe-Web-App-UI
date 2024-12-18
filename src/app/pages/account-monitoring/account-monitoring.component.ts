import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { AttendanceService } from '../../services/attendance.service';
import { Attendance } from '../../models/attendance.model';

@Component({
  selector: 'app-account-monitoring',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LeftsidebarComponent, 
    HeaderComponent
  ],
  templateUrl: './account-monitoring.component.html',
  styleUrls: ['./account-monitoring.component.css'],
})
export default class AccountMonitoringComponent implements OnInit {
  isMenuActive: boolean = false;
  startDate: string = ''; 
  endDate: string = ''; 

  users: User[] = [];
  selectedUser: User | null = null;
  attendances: Attendance[] = [];

  constructor(private menuService: MenuService, private userService: UserService, private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    this.menuService.changeHeaderText('Account Monitoring');

    this.userService.getUsers().subscribe((response) => {
      console.log('Users received from backend:', response.data); // Add this line for debugging
      this.users = response.data.filter(user => user.role !== 'admin'); //filter out admin users
    });
  }

  download(type: string) {
    console.log(`Download type: ${type}`);
    // Add API call for download based on type
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.attendanceService.getAttendance().subscribe((response) => {
      this.attendances = response.filter(attendance => attendance.userId === user._id);
    });
  }
}