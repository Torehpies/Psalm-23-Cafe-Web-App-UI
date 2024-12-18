import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product/product.model';
import { Response } from '../models/response.model';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = apiUrls.productServiceApi;
  private createProduct = `${this.baseUrl}create`;
  private getProductsById = `${this.baseUrl}:id`;
  private updateProducts = `${this.baseUrl}update`;

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Response<Product[]>>(this.baseUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.getProductsById}/${id}`);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post(this.createProduct, product, { responseType: 'text' as 'json' });
  }

  updateProduct(id: string, updatedData: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.updateProducts}/${id}`, updatedData);
  }
}
