import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuppliesService } from '../../../services/supplies.service';
import { UsedSuppliesService } from '../../../services/usedSupplies.service';
import { Supplies } from '../../../models/supplies.model';
import { UsedSupplies } from '../../../models/usedSupplies.model';
import { AddSupplyModalComponent } from './add-supply-modal/add-supply-modal.component';
import { EditSupplyModalComponent } from './edit-supply-modal/edit-supply-modal.component';
import { DeleteConfirmationModalComponent } from './delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-supply-table',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, AddSupplyModalComponent, 
    EditSupplyModalComponent, DeleteConfirmationModalComponent],
  templateUrl: './supply-table.component.html',
  styleUrls: ['./supply-table.component.css']
})
export class SupplyTableComponent implements OnInit {
  isAddActive = true;
  fromDate = '';
  toDate = '';
  showAddForm = false;
  showEditForm = false;
  showDeleteConfirm = false;

  supplyData: Supplies[] = [];
  usedSuppliesData: UsedSupplies[] = [];
  newSupplyData: UsedSupplies[] = [];
  addItemForm: FormGroup;
  editItemForm: FormGroup;
  currentItem: any = null;

  suppliesService = inject(SuppliesService);
  usedSuppliesService = inject(UsedSuppliesService);

  constructor(private fb: FormBuilder) {
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
      dateProduced: ['', Validators.required]
    });
  }

  private createEditItemForm(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      dateProduced: ['', Validators.required]
    });
  }

  private initializeData(): void {
    this.fetchAndStoreSupplyData();
    this.fetchAndStoreUsedSuppliesData();
    this.loadSupplyDataFromLocalStorage();
    this.applyDateFilter();
  }

  private fetchAndStoreSupplyData(): void {
    this.suppliesService.getSupplies().subscribe({
      next: (data) => {
        localStorage.setItem('supplyData', JSON.stringify(data));
        this.loadSupplyDataFromLocalStorage();
      },
      error: (error) => console.error('Error fetching supply data:', error)
    });
  }

  private fetchAndStoreUsedSuppliesData(): void {
    this.usedSuppliesService.fetchUsedSuppliesData().subscribe({
      next: (data) => {
        localStorage.setItem('usedSuppliesData', JSON.stringify(data.data));
        this.loadUsedSupplyDataFromLocalStorage();
      },
      error: (error) => console.error('Error fetching used supplies data:', error)
    });
  }

  private loadSupplyDataFromLocalStorage(): void {
    const storedData = localStorage.getItem('supplyData');
    if (storedData) {
      this.supplyData = JSON.parse(storedData);
    }
  }

  private loadUsedSupplyDataFromLocalStorage(): void {
    const storedData = localStorage.getItem('usedSuppliesData');
    if (storedData) {
      this.usedSuppliesData = JSON.parse(storedData);
    }
  }

  toggleView(): void {
    this.isAddActive = !this.isAddActive;
    this.applyDateFilter();
  }

  applyDateFilter(): void {
    if (this.isAddActive || !this.fromDate || !this.toDate) {
      this.usedSuppliesData = this.newSupplyData;
    } else {
      const fromDateObj = new Date(this.fromDate);
      const toDateObj = new Date(this.toDate);
      this.usedSuppliesData = this.newSupplyData.filter(record => {
        const supplyDateObj = new Date(record.usedAt);
        return supplyDateObj >= fromDateObj && supplyDateObj <= toDateObj;
      });
    }
  }

  toggleShowAddSupplyForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  toggleShowEditSupplyForm(): void {
    this.showEditForm = !this.showEditForm;
  }

  toggleShowDeleteConfirm(): void {
    this.showDeleteConfirm = !this.showDeleteConfirm;
  }

  editItem(item: any): void {
    this.currentItem = item;
    this.editItemForm.patchValue({
      itemName: item.supply.name,
      quantity: item.quantity,
      dateProduced: item.usedAt
    });
    this.toggleShowEditSupplyForm();
  }

  deleteItem(item: any): void {
    this.currentItem = item;
    this.toggleShowDeleteConfirm();
  }

  confirmDelete(): void {
    const index = this.newSupplyData.findIndex(item => item.supply.name === this.currentItem.name);
    if (index !== -1) {
      this.newSupplyData.splice(index, 1);
      this.applyDateFilter();
    }
    this.toggleShowDeleteConfirm();
  }

  cancelDelete(): void {
    this.currentItem = null;
    this.toggleShowDeleteConfirm();
  }

  onSubmit(): void {
    if (this.newSupplyData.length > 0) {
      this.usedSuppliesService.addUsedSupplies(this.newSupplyData).subscribe({
        next: () => {
          this.newSupplyData = [];
          this.applyDateFilter();
          this.toggleShowAddSupplyForm();
        },
        error: (error) => console.error('Error submitting used supplies:', error)
      });
    }
  }

  onUpdate(updatedItem: any): void {
    if (this.editItemForm.valid) {
      const index = this.newSupplyData.findIndex(item => item.supply.name === this.currentItem.supply.name);
      if (index !== -1) {
        this.newSupplyData[index] = {
          ...this.newSupplyData[index],
          quantity: updatedItem.quantity,
          usedAt: updatedItem.dateProduced
        };

        this.applyDateFilter();
        this.editItemForm.reset();
        this.toggleShowEditSupplyForm();
      }
    }
  }
}
