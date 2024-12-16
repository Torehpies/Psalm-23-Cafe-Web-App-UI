import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product/product.model';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Response<Product[]>>('http://localhost:8800/api/products');
  }

  saveProducts(){
    this.getProducts()
    .subscribe({
      next:(res) => {
        localStorage.setItem('products', JSON.stringify(res.data));
        // this.products = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  fetchAndSaveProducts() {
    this.getProducts().subscribe({
      next: (res) => {
        localStorage.setItem('products', JSON.stringify(res.data));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

// export type Response<T> = {
//   success: boolean;
//   status: number;
//   message: string;
//   data: T
// }

// export type Product = {
//   _id: string;
//   name: string;
//   unit: string;
//   Category: string;
//   price: number;
//   status: string;
//   currentStock: number;
//   par: number
// }