import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  private selectedCategory = new BehaviorSubject<string>('Bread'); // Initial category
  selectedCategory$ = this.selectedCategory.asObservable();

  setCategory(category: string): void {
    this.selectedCategory.next(category);
  }
}
