import { Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { ProductService } from './product.service';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  http = inject(HttpClient);
  productService = inject(ProductService)

  // isUserIn$ = new BehaviorSubject<boolean>(false);
  // isLoggedInSignal = signal<boolean>(false);

  getUserRole(): string | null {
  const token = localStorage.getItem('authToken');
  if (token) {
      const payload = this.decodeToken(token);
      return payload.role; // Assuming the role is stored in the 'role' field of the token
    }
    return null; // Return null if no token is found
  }

  getUserId(): string | null {
    const token = localStorage.getItem('authToken');
    if (token) {
        const payload = this.decodeToken(token);
        return payload.id; // Assuming the role is stored in the 'role' field of the token
      }
      return null; // Return null if no token is found
    }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1]; // Get the payload part of the JWT
    return JSON.parse(atob(payload)); // Decode and parse the payload
  }
  registerService(registerObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }

  loginService(loginObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }

  logoutService() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('products');
  }
  
  sendEmailService(email: string){
    return this.http.post<any>(`${apiUrls.authServiceApi}send-email`, {email: email});
  }

  resetPasswordService(resetObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}reset-password`, resetObj);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // isLoggedIn(){
  //   return !!localStorage.getItem("user_id");
  // }

  /*
  private apiUrl = 'http://localhost:8800';
  private loginUrl = `${this.apiUrl}/api/auth/login`;
  private createAccountUrl = `${this.apiUrl}/api/auth/register`;
  private forgotPasswordUrl = `${this.apiUrl}/forgot-password`;
  private resendVerificationUrl = `${this.apiUrl}/resend-verification`;
  private verifyVerificationCodeUrl = `${this.apiUrl}/verify-code`;
  private resetPasswordUrl = `${this.apiUrl}/reset-password`;

  constructor(private http: HttpClient) {}

  // For Login Endpoint
  login(email: string, password: string): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email, password });

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
  // Seiffer
  // Changed role -> position
  // Removed fullName changed to firstName and lastName
  createAccount(firstName: string, lastName: string, email: string, password: string, position: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ firstName, lastName, email, password, position});
    return this.http.post<any>(this.createAccountUrl, body, { headers });
  }

  sendEmailService(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email });
    return this.http.post<any>(this.forgotPasswordUrl, body, { headers });
  }
  */

}

