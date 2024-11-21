import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-supply-table',
  standalone: true,
  imports: [],
  templateUrl: './supply-table.component.html',
  styleUrl: './supply-table.component.css'
})
export class SupplyTableComponent {

  supplyData: { item: string; quantity: string; date: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadsupplyData();
  }

  loadsupplyData(): void {
    this.http.get<{ item: string; quantity: string; date: string }[]>('/api/worker-clockin-data')
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
