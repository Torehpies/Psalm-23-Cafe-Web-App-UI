import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from './response.model'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://your-api-url.com/login'; 

  constructor(private http: HttpClient) {}

  // For Login Endpoint
  login(username: string, password: string): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ username, password });

    return this.http.post<AuthResponse>(this.loginUrl, body, { headers }).pipe(
      tap(response => {
        if (response && response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
        }
      })
    );
  }

  // For Logout
  logout(): void {
    localStorage.removeItem('accessToken');
  }

  // For forgot password
}
