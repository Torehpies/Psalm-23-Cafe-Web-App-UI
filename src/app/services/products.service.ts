import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product/product.model';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:8800/api/products';
  private createProduct = `${this.apiUrl}/create`;
  private getProductsById = `${this.apiUrl}/:id`;
  private updateProducts = `${this.apiUrl}/update`;

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Response<Product[]>>(this.apiUrl);
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
