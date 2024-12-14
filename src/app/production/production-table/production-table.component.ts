import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-production-table',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './production-table.component.html',
  styleUrls: ['./production-table.component.css']
})
export class ProductionTableComponent {

  isAddActive: boolean = true;
  fromDate: string = '';
  toDate: string = '';
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  showDeleteConfirm: boolean = false;

  productData: { product_item: string; product_quantity: string; product_date: string; product_expiration: string }[] = [];
  filteredProductData: { product_item: string; product_quantity: string; product_date: string; product_expiration: string }[] = [];
  addItemForm: FormGroup;
  editItemForm: FormGroup;
  currentItem: any = null;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.addItemForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      dateProduced: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });

    this.editItemForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      dateProduced: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProductData();
    this.applyDateFilter();
  }

  toggleView(): void {
    this.isAddActive = !this.isAddActive;
    this.applyDateFilter();
  }

  loadProductData(): void {
    this.http.get<{ product_item: string; product_quantity: string; product_date: string; product_expiration: string }[]>('/api/production-data')
      .subscribe(
        (data) => {
          this.productData = data;
          this.applyDateFilter();
        },
        (error) => {
          console.error('Error fetching production data:', error);
        }
      );
  }

  applyDateFilter(): void {
    if (this.isAddActive || !this.fromDate || !this.toDate) {
      this.filteredProductData = this.productData;
    } else {
      const fromDateObj = new Date(this.fromDate);
      const toDateObj = new Date(this.toDate);
      this.filteredProductData = this.productData.filter(record => {
        const productDateObj = new Date(record.product_date);
        return productDateObj >= fromDateObj && productDateObj <= toDateObj;
      });
    }
  }

  toggleShowAddProductForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  toggleShowEditProductForm(): void {
    this.showEditForm = !this.showEditForm;
  }

  toggleShowDeleteConfirm(): void {
    this.showDeleteConfirm = !this.showDeleteConfirm;
  }

  editItem(item: any): void {
    this.currentItem = item;
    this.editItemForm.patchValue({
      itemName: item.product_item,
      quantity: item.product_quantity,
      dateProduced: item.product_date,
      expirationDate: item.product_expiration
    });
    this.toggleShowEditProductForm();
  }

  deleteItem(item: any): void {
    this.currentItem = item;
    this.toggleShowDeleteConfirm();
  }

  confirmDelete(): void {
    const index = this.productData.findIndex(item => item.product_item === this.currentItem.product_item);
    if (index !== -1) {
      this.productData.splice(index, 1);
      this.applyDateFilter();
    }
    this.toggleShowDeleteConfirm();
  }

  cancelDelete(): void {
    this.currentItem = null;
    this.toggleShowDeleteConfirm();
  }

  onSubmit(): void {
    if (this.addItemForm.valid) {
      const newItem = {
        product_item: this.addItemForm.value.itemName,
        product_quantity: this.addItemForm.value.quantity,
        product_date: this.addItemForm.value.dateProduced,
        product_expiration: this.addItemForm.value.expirationDate
      };

      this.productData.push(newItem);
      this.applyDateFilter();
      this.addItemForm.reset();
      this.toggleShowAddProductForm();
    }
  }

  onUpdate(): void {
    if (this.editItemForm.valid) {
      const index = this.productData.findIndex(item => item.product_item === this.currentItem.product_item);
      if (index !== -1) {
        this.productData[index] = {
          product_item: this.currentItem.product_item,
          product_quantity: this.editItemForm.value.quantity,
          product_date: this.editItemForm.value.dateProduced,
          product_expiration: this.editItemForm.value.expirationDate
        };

        this.applyDateFilter();
        this.editItemForm.reset();
        this.toggleShowEditProductForm();
      }
    }
  }
}
