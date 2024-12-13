import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplies } from '../models/supplies.model';
import { StockHistory } from '../models/stock-history.model';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  private apiUrl = 'http://localhost:8800/api/supplies';
  private historyUrl = 'http://localhost:8800/api/stockhistory';
  private createStockHistory = 'http://localhost:8800/api/stockhistory/create';
  private createSupply = `${this.apiUrl}/create`;
  private editSupply = `${this.apiUrl}/update/:id`;

  constructor(private http: HttpClient) {}
  
   // Fetch all supplies from the backend
   getSupplies(): Observable<Supplies[]> {
    return this.http.get<Supplies[]>(this.apiUrl);
  }

  getSupplyById(id: string): Observable<Supplies> {
    return this.http.get<Supplies>(`${this.apiUrl}/${id}`);
  }
  
  getsupplyHistory(): Observable<any> {
    return this.http.get(this.historyUrl);  // Fetch all supply history from the backend
  }

  getSupplyHistoryById(id: string): Observable<any> {
    return this.http.get(`${this.historyUrl}/${id}`); // Fetch a specific supply history from the backend
  }

  addStockHistory(history: StockHistory): Observable<any> {
    return this.http.post(this.createStockHistory, history, { responseType: 'text' as 'json'}); // Add a new stock history to the backend
  }

  // Check for duplicate supplies
  private isDuplicateSupply(newSupply: Supplies, existingSupplies: Supplies[]): boolean {
    return existingSupplies.some(supply => supply.name === newSupply.name);
  }

  // Add a new supply to the backend with validation
  addSupply(supply: Supplies): Observable<any> {
    return new Observable(observer => {
      this.getSupplies().subscribe(existingSupplies => {
        if (this.isDuplicateSupply(supply, existingSupplies)) {
          observer.error('Duplicate supply found');
        } else {
          this.http.post(this.createSupply, supply, { responseType: 'text' as 'json'}).subscribe(
            response => {
              observer.next(response);
              observer.complete();
            },
            error => {
              observer.error(error);
            }
          );
        }
      });
    });
  }
  

  // Update an existing supply
  updateSupply(id: string, updatedData: Partial<Supplies>): Observable<Supplies> {
    return this.http.put<Supplies>(`${this.editSupply}/${id}`, updatedData);
  }

  // Delete a supply
  deleteSupply(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
