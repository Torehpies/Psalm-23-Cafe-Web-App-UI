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

  getAttendanceByUserId(userId: string): Observable<Attendance[]> {
    return this.httpClient.get<Attendance[]>(`${apiUrls.attendanceServiceApi}user/${userId}`);
  }

  getAttendanceById(attendanceId: string): Observable<Attendance> {
    return this.httpClient.get<Attendance>(`${apiUrls.attendanceServiceApi}${attendanceId}`);
  }

  timeIn(payload: {userId: string, TimeIn: Date | string}): Observable<any> {
    return this.httpClient.post(`${apiUrls.attendanceServiceApi}timein`, payload);
  }

  timeOut(attendanceId: string, payload: {userId: string, TimeOut: Date | string}): Observable<Attendance> {
    return this.httpClient.patch<Attendance>(`${apiUrls.attendanceServiceApi}timeout/${attendanceId}`, payload);
  }
}
