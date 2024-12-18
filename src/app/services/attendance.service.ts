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

  timeIn(timeIn: Date): Observable<any> {
    return this.httpClient.post(`${apiUrls.attendanceServiceApi}timein`, timeIn);
  }

  timeOut(attendanceId: string, timeOut: Date): Observable<Attendance> {
    return this.httpClient.put<Attendance>(`${apiUrls.attendanceServiceApi}timeout/${attendanceId}`, timeOut);
  }
}
