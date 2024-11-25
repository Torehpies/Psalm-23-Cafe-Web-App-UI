import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemTestService {
  item: { 
    name: string; 
    category: string; 
    unit: string; 
    stock: number; 
    par: number;
  }[] = [];

  history: { 
    name: string; 
    quantity: number; 
    dateAdded: string; 
    expireDate: string; 
    price: number;
  }[] = []

  getItem() {
    return this.item;
  }

  additem(supply: { name: string; category: string; unit: string; stock: number; par: number }) {
    const existingItem = this.item.find((item) => item.name === supply.name);
    if (!existingItem) {
      this.item.push(supply);
    } else {
      console.warn(`Item with the name "${supply.name}" already exists.`);
    }
  }
  

  updateItem(name: string, quantity: number) {
    const supply = this.item.find((s) => s.name === name);
    if (supply) {
      supply.stock += quantity;
    }
  }

  addHistory(history: {
    name: string; 
    quantity: number; 
    dateAdded: string; 
    expireDate: string; 
    price: number;
  }) {
    this.history.push(history);
  }

  getHistory() {
    return this.history;
  }

}
