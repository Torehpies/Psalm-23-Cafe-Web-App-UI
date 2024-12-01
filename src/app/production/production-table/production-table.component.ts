import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-production-table',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Add CommonModule here
  templateUrl: './production-table.component.html',
  styleUrl: './production-table.component.css'
})
export class ProductionTableComponent {

  isAddActive: boolean = true; // Initial state: "ADD" is active
  fromDate: string = ''; // Initialize fromDate
  toDate: string = ''; // Initialize toDate

  productData: { product_item: string; product_quantity: string; product_date: string; product_expiration: string }[] = [];
  filteredProductData: { product_item: string; product_quantity: string; product_date: string; product_expiration: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadproductData();
    // Adding sample data for testing
    this.productData = [
      { product_item: 'Pandesal', product_quantity: '1 Kilogram', product_date: '2024-10-24', product_expiration: '2024-10-27' },
      { product_item: 'Ensaymada', product_quantity: '2 Kilograms', product_date: '2024-11-01', product_expiration: '2024-11-05' },
      { product_item: 'Monay', product_quantity: '3 Kilograms', product_date: '2024-11-10', product_expiration: '2024-11-15' },
      { product_item: 'Pan de Coco', product_quantity: '5 Kilograms', product_date: '2024-11-20', product_expiration: '2024-11-25' }
    ];
    this.applyDateFilter(); // Apply initial filter
  }

  toggleView(): void {
    this.isAddActive = !this.isAddActive;
    this.applyDateFilter();
  }
  
  loadproductData(): void {
    this.http.get<{ product_item: string; product_quantity: string; product_date: string; product_expiration: string }[]>('/api/worker-product-data')
      .subscribe(
        (data) => {
          this.productData = data;
          this.applyDateFilter();
        },
        (error) => {
          console.error('Error fetching supply data:', error);
        }
      );
  }

  applyDateFilter(): void {
    if (this.isAddActive || !this.fromDate || !this.toDate) {
      this.filteredProductData = this.productData; // Show all data when in add mode or no date selected
    } else {
      const fromDateObj = new Date(this.fromDate);
      const toDateObj = new Date(this.toDate);
      this.filteredProductData = this.productData.filter(record => {
        const productDateObj = new Date(record.product_date);
        return productDateObj >= fromDateObj && productDateObj <= toDateObj;
      });
    }
  }
}
