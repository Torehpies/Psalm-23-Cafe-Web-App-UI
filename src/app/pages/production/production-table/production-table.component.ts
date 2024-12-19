import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';
import { EditProductModalComponent } from './edit-product-modal/edit-product-modal.component';
import { DeleteConfirmationModalComponent } from './delete-confirmation-modal/delete-confirmation-modal.component';
import { forkJoin } from 'rxjs';
import { Product } from '../../../models/product/product.model';
import { ProduceHistory } from '../../../models/produceHistory.model';
import { ProductsService } from '../../../services/products.service';
import { ProduceHistoryService } from '../../../services/produceHistory.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-production-table',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, 
    AddProductModalComponent, EditProductModalComponent, DeleteConfirmationModalComponent],
  templateUrl: './production-table.component.html',
  styleUrls: ['./production-table.component.css']
})
export class ProductionTableComponent implements OnInit {
  isAddActive = true;
  fromDate = '';
  toDate = '';
  showAddForm = false;
  showEditForm = false;
  showDeleteConfirm = false;
  showStatusModal = false;
  statusMessage = '';

  productData: Product[] = [];
  produceHistoryData: ProduceHistory[] = [];
  newProduceHistoryData: ProduceHistory[] = [];
  addItemForm: FormGroup;
  editItemForm: FormGroup;
  currentItem: any = null;
  index: number | null = null;

  productsService = inject(ProductsService);
  produceHistoryService = inject(ProduceHistoryService);
  authService = inject(AuthService);

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.addItemForm = this.createAddItemForm();
    this.editItemForm = this.createEditItemForm();
  }

  ngOnInit(): void {
    this.initializeData();
  }

  private createAddItemForm(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      dateProduced: [new Date().toISOString().substring(0, 10), Validators.required],
      expirationDate: [new Date().toISOString().substring(0, 10), Validators.required],
    });
  }

  private createEditItemForm(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      dateProduced: [new Date().toISOString().substring(0, 10), Validators.required],
      expirationDate: [new Date().toISOString().substring(0, 10), Validators.required],
    });
  }

  private initializeData(): void {
    forkJoin({
      products: this.productsService.getProducts(),
      produceHistory: this.produceHistoryService.fetchProduceHistoryData()
    }).subscribe({
      next: ({ products, produceHistory }) => {
        this.productData = products.data;
        this.produceHistoryData = produceHistory.data.sort((a, b) => new Date(b.producedAt).getTime() - new Date(a.producedAt).getTime());
        localStorage.setItem('products', JSON.stringify(products.data));
        localStorage.setItem('produceHistoryData', JSON.stringify(produceHistory.data));
        this.applyDateFilter();
      },
      error: (error) => console.error('Error fetching data:', error.message)
    });
  }

  toggleView(): void {
    this.isAddActive = !this.isAddActive;
    this.applyDateFilter();
  }

  applyDateFilter(): void {
    if (this.isAddActive) {
      this.produceHistoryData = this.newProduceHistoryData.sort((a, b) => new Date(b.producedAt).getTime() - new Date(a.producedAt).getTime());
    } else {
      const fromDateObj = this.fromDate ? new Date(this.fromDate) : null;
      const toDateObj = this.toDate ? new Date(this.toDate) : null;
      this.produceHistoryData = JSON.parse(localStorage.getItem('produceHistoryData') || '[]');
      this.produceHistoryData = this.produceHistoryData.filter(record => {
        const produceDateObj = new Date(record.producedAt);
        return (!fromDateObj || produceDateObj >= fromDateObj) && (!toDateObj || produceDateObj <= toDateObj);
      }).sort((a, b) => new Date(b.producedAt).getTime() - new Date(a.producedAt).getTime());
    }
  }

  editItem(index: number): void {
    this.index = index;
    this.currentItem = this.newProduceHistoryData[index];
    this.showEditForm = true;
  }

  deleteItem(index: number): void {
    this.index = index;
    this.showDeleteConfirm = true;
  }

  confirmDelete(): void {
    if (this.index !== null) {
      this.newProduceHistoryData.splice(this.index, 1);
    }
    this.showDeleteConfirm = false;
  }

  cancelDelete(): void {
    this.index = null;
    this.showDeleteConfirm = false;
  }

  onSubmit(newProduct: any): void {
    const newProduceHistory: ProduceHistory = {
      product: {_id: newProduct.id, name: newProduct.itemName},
      quantity: newProduct.quantity,
      employee: this.authService.getUserId(),
      producedAt: newProduct.dateProduced, 
      expiresAt: newProduct.expirationDate
    };

    this.newProduceHistoryData.push(newProduceHistory);
    this.showAddForm = false;
  }

  onUpdate(updatedItem: any): void {
    if (this.index !== null) {
      this.newProduceHistoryData[this.index] = {
        product: {_id: updatedItem._id, name: updatedItem.itemName},
        quantity: updatedItem.quantity,
        employee: this.authService.getUserId(),
        producedAt: updatedItem.dateProduced,
        expiresAt: updatedItem.expirationDate
      };

      this.applyDateFilter();
      this.showEditForm = false;
    }
  
  }
  submitProduceHistory(): void {
    if (this.newProduceHistoryData.length > 0) {
      let completedRequests = 0;
      for (const produce of this.newProduceHistoryData) {
        console.log('Produce:', produce);
        this.produceHistoryService.addProduceHistory(produce).subscribe({
          next: () => {
            completedRequests++;
            if (completedRequests === this.newProduceHistoryData.length) {
              this.newProduceHistoryData = [];
              this.applyDateFilter();
              this.refetchData();
              this.showStatus('Data submitted successfully');
            }
          },
          error: (error) => {
            console.error('Error submitting used supplies:', error);
            this.showStatus('Error submitting data');
          }
        });
      }
    }
  }

  private refetchData(): void {
    forkJoin({
      products: this.productsService.getProducts(),
      produceHistory: this.produceHistoryService.fetchProduceHistoryData()
    }).subscribe({
      next: ({ products, produceHistory }) => {
        this.productData = products.data;
        this.produceHistoryData = produceHistory.data.sort((a, b) => new Date(b.producedAt).getTime() - new Date(a.producedAt).getTime());
        localStorage.setItem('products', JSON.stringify(products.data));
        localStorage.setItem('produceHistoryData', JSON.stringify(produceHistory.data));
        this.applyDateFilter();
      },
      error: (error) => console.error('Error refetching data:', error)
    });
  }

  private showStatus(message: string): void {
    this.statusMessage = message;
    this.showStatusModal = true;
    setTimeout(() => {
      this.showStatusModal = false;
    }, 3000); // Hide the modal after 3 seconds
  }

  
}
