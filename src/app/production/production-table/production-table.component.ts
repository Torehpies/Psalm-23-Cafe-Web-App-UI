import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-production-table',
  standalone: true,
  imports: [],
  templateUrl: './production-table.component.html',
  styleUrl: './production-table.component.css'
})
export class ProductionTableComponent {

  isAddActive: boolean = true; // Initial state: "ADD" is active

  toggleView(): void {
    this.isAddActive = !this.isAddActive;
  }
  
  productData: { product_item: string; product_quantity: string; product_date: string; product_expiration: string}[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadproductData();
  }

  loadproductData(): void {
    this.http.get<{ product_item: string; product_quantity: string; product_date: string; product_expiration: string}[]>('/api/worker-product-data')
      .subscribe(
        (data) => {
          this.productData = data;
        },
        (error) => {
          console.error('Error fetching supply data:', error);
        }
      );
  }
}
