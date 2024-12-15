import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '../models/attendance.model';
import { apiUrls } from '../api.urls';
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private httpClient: HttpClient) { }

  getAttendance(): Observable<Attendance[]> {
    return this.httpClient.get<Attendance[]>(`${apiUrls.attendanceServiceApi}`);
  }

  getAttendanceById(attendanceId: string): Observable<Attendance> {
    return this.httpClient.get<Attendance>(`${apiUrls.attendanceServiceApi}${attendanceId}`);
  }

  createAttendance(attendance: Attendance): Observable<any> {
    return this.httpClient.post(`${apiUrls.attendanceServiceApi}create`, attendance, { responseType: 'text' as 'json' });
  }

  updateAttendance(attendanceId: string, updatedData: Partial<Attendance>): Observable<Attendance> {
    return this.httpClient.put<Attendance>(`${apiUrls.attendanceServiceApi}${attendanceId}`, updatedData);
  }
}
