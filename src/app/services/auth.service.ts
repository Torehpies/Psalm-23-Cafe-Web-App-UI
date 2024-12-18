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

  getUserName() {
    return this.http.get<{ firstName: string, lastName: string }>(`${apiUrls.authServiceApi}username`);
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
    localStorage.clear(); // Clear all items from local storage
  }
  
  sendEmailService(email: string){
    return this.http.post<any>(`${apiUrls.authServiceApi}send-email`, {email: email});
  }

  resetPasswordService(resetObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}reset-password`, resetObj);
  }

  reappealEmailService(email: string) {
    return this.http.post<any>(`${apiUrls.authServiceApi}reappeal-email`, { email: email });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}

