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

  isAddActive: boolean = true; // Initial state: "ADD" is active\
  fromDate: string = ''; // Initialize fromDate
  toDate: string = ''; // Initialize toDate

  toggleView(): void {
    this.isAddActive = !this.isAddActive;
  }
  
  scrapData: { scrap_id: string; scrap_name: string; scrap_quantity: string; scrap_date: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadscrapData();
  }

  loadscrapData(): void {
    this.http.get<{ scrap_id: string; scrap_name: string; scrap_quantity: string; scrap_date: string }[]>('/api/worker-scrap-data')
      .subscribe(
        (data) => {
          this.scrapData = data;
        },
        (error) => {
          console.error('Error fetching supply data:', error);
        }
      );
  }
}
