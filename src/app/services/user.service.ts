import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';
import { apiUrls } from '../api.urls';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<Response<User[]>> {
    return this.httpClient.get<Response<User[]>>(`${apiUrls.userServiceApi}`);
  }

  getUserById(userId: string): Observable<Response<User>> {
    return this.httpClient.get<Response<User>>(`${apiUrls.userServiceApi}/${userId}`);
  }
}
