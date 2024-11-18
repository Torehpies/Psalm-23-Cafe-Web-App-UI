import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from './response.model';

@Injectable({
  providedIn: 'root'  
})
export class AuthService {
  private apiUrl = 'http://localhost:7000';
  private loginUrl = `${this.apiUrl}/login`;
  private createAccountUrl = `${this.apiUrl}/create-account`; 
  private forgotPasswordUrl = `${this.apiUrl}/forgot-password`;
  private resendVerificationUrl = `${this.apiUrl}/resend-verification`;
  private verifyVerificationCodeUrl = `${this.apiUrl}/verify-code`;
  private resetPasswordUrl = `${this.apiUrl}/reset-password`;

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

  // Forgot Password Endpoint
  forgotPassword(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email });

    return this.http.post<any>(this.forgotPasswordUrl, body, { headers });
  }

  //For resend Verification Code - email
  resendVerificationCode(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email });
  
    return this.http.post<any>(this.resendVerificationUrl, body, { headers });
  }

  //Verify Verification - Email and code
  verifyCode(email: string, code: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email, code });
  
    return this.http.post<any>(this.verifyVerificationCodeUrl, body, { headers });
  }
  
  // Reset Password - yung email, new password
  resetPassword(email: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email, newPassword });
  
    return this.http.post<any>(this.resetPasswordUrl, body, { headers });
  }
  
  // Create account method
  createAccount(firstName: string, lastName: string, email: string, password: string, role: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const fullName = `${firstName} ${lastName}`;
    const body = JSON.stringify({ fullName, email, password, role });
    return this.http.post<any>(this.createAccountUrl, body, { headers });
  }
  
  
}
