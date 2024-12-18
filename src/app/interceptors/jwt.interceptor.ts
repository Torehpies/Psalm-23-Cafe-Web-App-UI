import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    // Clone the request and add the Authorization header
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    })

    return next(cloned);
  }
  return next(req);
}
