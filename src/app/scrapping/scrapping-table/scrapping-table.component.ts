import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-scrapping-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './scrapping-table.component.html',
  styleUrl: './scrapping-table.component.css'
})
export class ScrappingTableComponent {

  isAddActive: boolean = true; // Initial state: "ADD" is active
  fromDate: string = ''; // Initialize fromDate
  toDate: string = ''; // Initialize toDate

  scrapData: { scrap_id: string; scrap_name: string; scrap_quantity: string; scrap_date: string }[] = [];
  filteredScrapData: { scrap_id: string; scrap_name: string; scrap_quantity: string; scrap_date: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadscrapData();
    // Adding sample data for testing
    this.scrapData = [
      { scrap_id: 'B-001', scrap_name: 'Pan de Coco', scrap_quantity: '200', scrap_date: '2024-10-25' },
      { scrap_id: 'B-002', scrap_name: 'Pandesal', scrap_quantity: '300', scrap_date: '2024-10-30' },
      { scrap_id: 'B-003', scrap_name: 'Monay', scrap_quantity: '400', scrap_date: '2024-11-05' },
      { scrap_id: 'B-004', scrap_name: 'Ensaymada', scrap_quantity: '150', scrap_date: '2024-11-30' }
    ];
    this.applyDateFilter(); // Apply initial filter
  }

  toggleView(): void {
    this.isAddActive = !this.isAddActive;
    this.applyDateFilter();
  }
  
  loadscrapData(): void {
    this.http.get<{ scrap_id: string; scrap_name: string; scrap_quantity: string; scrap_date: string }[]>('/api/worker-scrap-data')
      .subscribe(
        (data) => {
          this.scrapData = data;
          this.applyDateFilter();
        },
        (error) => {
          console.error('Error fetching supply data:', error);
        }
      );
  }

  applyDateFilter(): void {
    if (this.isAddActive || !this.fromDate || !this.toDate) {
      this.filteredScrapData = this.scrapData; // Show all data when in add mode or no date selected
    } else {
      const fromDateObj = new Date(this.fromDate);
      const toDateObj = new Date(this.toDate);
      this.filteredScrapData = this.scrapData.filter(record => {
        const scrapDateObj = new Date(record.scrap_date);
        return scrapDateObj >= fromDateObj && scrapDateObj <= toDateObj;
      });
    }
  }
}
