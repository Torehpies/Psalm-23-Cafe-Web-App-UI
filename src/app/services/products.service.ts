import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/products.model';
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
    return this.http.get<Response<Products[]>>(this.apiUrl);
  }

  getProductById(id: string): Observable<Products> {
    return this.http.get<Products>(`${this.getProductsById}/${id}`);
  }

  addProduct(product: Products): Observable<any> {
    return this.http.post(this.createProduct, product, { responseType: 'text' as 'json' });
  }

  updateProduct(id: string, updatedData: Partial<Products>): Observable<Products> {
    return this.http.put<Products>(`${this.updateProducts}/${id}`, updatedData);
  }
}
