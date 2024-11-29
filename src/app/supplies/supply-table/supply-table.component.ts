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

  toggleView(): void {
    this.isAddActive = !this.isAddActive;
  }

    
  supplyData: { supply_item: string; supply_quantity: string; supply_date: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadsupplyData();
  }

  loadsupplyData(): void {
    this.http.get<{ supply_item: string; supply_quantity: string; supply_date: string }[]>('/api/worker-supply-data')
      .subscribe(
        (data) => {
          this.supplyData = data;
        },
        (error) => {
          console.error('Error fetching supply data:', error);
        }
      );
  }
}
