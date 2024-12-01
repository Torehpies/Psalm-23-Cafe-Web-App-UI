import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-supply-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './supply-table.component.html',
  styleUrl: './supply-table.component.css'
})
export class SupplyTableComponent {

  isAddActive: boolean = true; // Initial state: "ADD" is active
  fromDate: string = ''; // Initialize fromDate
  toDate: string = ''; // Initialize toDate

  supplyData: { supply_item: string; supply_quantity: string; supply_date: string }[] = [];
  filteredSupplyData: { supply_item: string; supply_quantity: string; supply_date: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadsupplyData();
    // Adding sample data for testing
    this.supplyData = [
      { supply_item: 'Flour', supply_quantity: '1 Kilogram', supply_date: '2024-10-24' },
      { supply_item: 'Sugar', supply_quantity: '2 Kilograms', supply_date: '2024-11-01' },
      { supply_item: 'Salt', supply_quantity: '3 Kilograms', supply_date: '2024-11-10' },
      { supply_item: 'Butter', supply_quantity: '5 Kilograms', supply_date: '2024-11-20' }
    ];
    this.applyDateFilter(); // Apply initial filter
  }

  toggleView(): void {
    this.isAddActive = !this.isAddActive;
    this.applyDateFilter();
  }

  loadsupplyData(): void {
    this.http.get<{ supply_item: string; supply_quantity: string; supply_date: string }[]>('/api/worker-supply-data')
      .subscribe(
        (data) => {
          this.supplyData = data;
          this.applyDateFilter();
        },
        (error) => {
          console.error('Error fetching supply data:', error);
        }
      );
  }

  applyDateFilter(): void {
    if (this.isAddActive || !this.fromDate || !this.toDate) {
      this.filteredSupplyData = this.supplyData; // Show all data when in add mode or no date selected
    } else {
      const fromDateObj = new Date(this.fromDate);
      const toDateObj = new Date(this.toDate);
      this.filteredSupplyData = this.supplyData.filter(record => {
        const supplyDateObj = new Date(record.supply_date);
        return supplyDateObj >= fromDateObj && supplyDateObj <= toDateObj;
      });
    }
  }
}
