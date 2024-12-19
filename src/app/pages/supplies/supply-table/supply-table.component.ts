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
import { AuthService } from '../../../services/auth.service';
import { forkJoin } from 'rxjs';

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
  showStatusModal = false;
  statusMessage = '';

  supplyData: Supplies[] = [];
  usedSuppliesData: UsedSupplies[] = [];
  newSupplyData: UsedSupplies[] = [];
  addItemForm: FormGroup;
  editItemForm: FormGroup;
  currentItem: any = null;

  suppliesService = inject(SuppliesService);
  usedSuppliesService = inject(UsedSuppliesService);
  authService = inject(AuthService);

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
    forkJoin({
      supplies: this.suppliesService.getSupplies(),
      usedSupplies: this.usedSuppliesService.fetchUsedSuppliesData()
    }).subscribe({
      next: ({ supplies, usedSupplies }) => {
        this.supplyData = supplies;
        this.usedSuppliesData = usedSupplies.data;
        localStorage.setItem('supplyData', JSON.stringify(supplies));
        localStorage.setItem('usedSuppliesData', JSON.stringify(usedSupplies.data));
        this.applyDateFilter();
      },
      error: (error) => console.error('Error fetching data:', error)
    });
  }

  toggleView(): void {
    this.isAddActive = !this.isAddActive;
    this.applyDateFilter();
  }

  applyDateFilter(): void {
    if (this.isAddActive) {
      this.usedSuppliesData = this.newSupplyData;
    } else {
      const fromDateObj = this.fromDate ? new Date(this.fromDate) : null;
      const toDateObj = this.toDate ? new Date(this.toDate) : null;
      this.usedSuppliesData = JSON.parse(localStorage.getItem('usedSuppliesData') || '[]');
      this.usedSuppliesData = this.usedSuppliesData.filter(record => {
        const supplyDateObj = new Date(record.usedAt);
        return (!fromDateObj || supplyDateObj >= fromDateObj) && (!toDateObj || supplyDateObj <= toDateObj);
      });
    }
  }

  editItem(item: any): void {
    this.currentItem = item;
    this.editItemForm.patchValue({
      itemName: item.supply.name,
      quantity: item.quantity,
      dateProduced: item.usedAt
    });
    this.showEditForm = true;
  }

  deleteItem(item: any): void {
    this.currentItem = item;
    this.showDeleteConfirm = true;
  }

  confirmDelete(): void {
    const index = this.newSupplyData.findIndex(item => item.supply.name === this.currentItem.supply.name);
    if (index !== -1) {
      this.newSupplyData.splice(index, 1);
      this.applyDateFilter();
    }
    this.showDeleteConfirm = false;
  }

  cancelDelete(): void {
    this.currentItem = null;
    this.showDeleteConfirm = false;
  }

  onSubmit(newSupply: any): void {
    const newUsedSupply: UsedSupplies = {
      supply: { _id: newSupply.id, name: newSupply.itemName},
      quantity: newSupply.quantity,
      usedAt: new Date(newSupply.dateProduced).toISOString(), // Ensure the date is stored as a full form default date value
      employee: this.authService.getUserId()
    };
    this.newSupplyData.push(newUsedSupply);
    this.applyDateFilter();
    this.showAddForm = false; // Ensure the form closes after submission
  }

  submitUsedSupplies(): void {
    if (this.newSupplyData.length > 0) {
      let completedRequests = 0;
      for (const supply of this.newSupplyData) {
        this.usedSuppliesService.addUsedSupplies(supply).subscribe({
          next: () => {
            completedRequests++;
            if (completedRequests === this.newSupplyData.length) {
              this.newSupplyData = [];
              this.applyDateFilter();
              this.refetchData(); // Refetch data after successful submission
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
      supplies: this.suppliesService.getSupplies(),
      usedSupplies: this.usedSuppliesService.fetchUsedSuppliesData()
    }).subscribe({
      next: ({ supplies, usedSupplies }) => {
        this.supplyData = supplies;
        this.usedSuppliesData = usedSupplies.data;
        localStorage.setItem('supplyData', JSON.stringify(supplies));
        localStorage.setItem('usedSuppliesData', JSON.stringify(usedSupplies.data));
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

  onUpdate(updatedItem: any): void {
    if (this.editItemForm.valid) {
      const index = this.newSupplyData.findIndex(item => item.supply._id === updatedItem.id);
      if (index !== -1) {
        this.newSupplyData[index] = {
          ...this.newSupplyData[index],
          supply: { _id: updatedItem.id, name: updatedItem.itemName },
          quantity: updatedItem.quantity,
          usedAt: new Date(updatedItem.dateProduced).toISOString() // Ensure the date is stored as a full form default date value
        };

        this.applyDateFilter();
        this.editItemForm.reset();
        this.showEditForm = false; // Ensure the form closes after submission
      }
    }
  }

  downloadCSV(data: any[], filename: string): void {
    const csvData = this.convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  convertToCSV(data: any[]): string {
    const headers = Object.keys(data[0]);
    const csvRows = data.map(row => headers.map(header => JSON.stringify(row[header], (key, value) => value === null ? '' : value)).join(','));
    return [headers.join(','), ...csvRows].join('\r\n');
  }

  downloadCustomRange(): void {
    const filteredData = this.usedSuppliesData.filter(record => {
      const supplyDateObj = new Date(record.usedAt);
      const fromDateObj = this.fromDate ? new Date(this.fromDate) : null;
      const toDateObj = this.toDate ? new Date(this.toDate) : null;
      return (!fromDateObj || supplyDateObj >= fromDateObj) && (!toDateObj || supplyDateObj <= toDateObj);
    });
    this.downloadCSV(filteredData, 'custom_range_supplies.csv');
  }

  downloadAllTime(): void {
    const allData = JSON.parse(localStorage.getItem('usedSuppliesData') || '[]');
    this.downloadCSV(allData, 'all_time_supplies.csv');
  }

  downloadMonthToDate(): void {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const filteredData = this.usedSuppliesData.filter(record => {
      const supplyDateObj = new Date(record.usedAt);
      return supplyDateObj >= firstDayOfMonth && supplyDateObj <= currentDate;
    });
    this.downloadCSV(filteredData, 'month_to_date_supplies.csv');
  }

  downloadToday(): void {
    const currentDate = new Date();
    const filteredData = this.usedSuppliesData.filter(record => {
      const supplyDateObj = new Date(record.usedAt);
      return supplyDateObj.toDateString() === currentDate.toDateString();
    });
    this.downloadCSV(filteredData, 'today_supplies.csv');
  }
}
