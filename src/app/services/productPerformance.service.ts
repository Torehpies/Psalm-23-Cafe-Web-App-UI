import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../models/response.model';

import { apiUrls } from '../api.urls';
import { ProductPerformance } from '../models/productPerformance.model';

@Injectable({
  providedIn: 'root'
})
export class ProductPerformanceService {

  constructor(private http: HttpClient) { }

  getProductPerformance() {
    return this.http.get<Response<ProductPerformance[]>>(`${apiUrls.productPerformanceServiceApi}`);
  }
}