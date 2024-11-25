import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { map } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})

export class InventoryService {

  private apiUrl = "http://localhost:7000/ingredients";

  constructor(private http: HttpClient) {}

  // Method to get items
  getItems(): Observable<Item[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl}`).pipe(
      map((ingredients) => 
        ingredients.map(ingredient => ({
          name: ingredient.name,
          quantity: ingredient.stock,
          unit: ingredient.unit,
          id: ingredient._id?.toString()
        }))
      )
    );
  }

  // Method to add a new item
  addItem(item: Item): Observable<string> {
    // Transform the item to match the backend Ingredient format
    const ingredientData = {
      name: item.name,
      stock: item.quantity,  // Assuming 'quantity' in Item maps to 'stock' in Ingredient
      unit: item.unit,
    };
  
    // Send POST request with the transformed data and set responseType to 'text'
    return this.http.post<string>(this.apiUrl, ingredientData, { responseType: 'text' as 'json' });
  }

 restockItem(id: string,item: Item): Observable<string> {
  return this.http.put<string>(`${this.apiUrl}/${id}`, item);
 }
}

