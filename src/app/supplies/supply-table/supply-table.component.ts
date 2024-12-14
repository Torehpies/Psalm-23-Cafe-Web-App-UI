import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-supply-table',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './supply-table.component.html',
  styleUrls: ['./supply-table.component.css']
})
export class SupplyTableComponent {

  isAddActive: boolean = true; // Initial state: "ADD" is active
  fromDate: string = ''; // Initialize fromDate
  toDate: string = ''; // Initialize toDate
  showAddForm: boolean = false; // State to show/hide Add Item modal
  showEditForm: boolean = false; // State to show/hide Edit Item modal
  showDeleteConfirm: boolean = false; // State to show/hide Delete Confirmation modal

  supplyData: { supply_item: string; supply_quantity: string; supply_date: string }[] = [];
  filteredSupplyData: { supply_item: string; supply_quantity: string; supply_date: string }[] = [];
  addItemForm: FormGroup;
  editItemForm: FormGroup;
  currentItem: any = null; // To store the current item being edited or deleted

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.addItemForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      dateProduced: ['', Validators.required]
    });

    this.editItemForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      dateProduced: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadsupplyData();
    this.applyDateFilter(); // Apply initial filter
  }

  toggleView(): void {
    this.isAddActive = !this.isAddActive;
    this.applyDateFilter();
  }

  loadsupplyData(): void {
    this.http.get<{ supply_item: string; supply_quantity: string; supply_date: string }[]>('/api/worker-supply-data')
      .subscribe(
        (data) => {
          this.supplyData = data;
          this.applyDateFilter();
        },
        (error) => {
          console.error('Error fetching supply data:', error);
        }
      );
  }

  applyDateFilter(): void {
    if (this.isAddActive || !this.fromDate || !this.toDate) {
      this.filteredSupplyData = this.supplyData; // Show all data when in add mode or no date selected
    } else {
      const fromDateObj = new Date(this.fromDate);
      const toDateObj = new Date(this.toDate);
      this.filteredSupplyData = this.supplyData.filter(record => {
        const supplyDateObj = new Date(record.supply_date);
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
      itemName: item.supply_item,
      quantity: item.supply_quantity,
      dateProduced: item.supply_date
    });
    this.toggleShowEditSupplyForm();
  }

  deleteItem(item: any): void {
    this.currentItem = item;
    this.toggleShowDeleteConfirm();
  }

  confirmDelete(): void {
    const index = this.supplyData.findIndex(item => item.supply_item === this.currentItem.supply_item);
    if (index !== -1) {
      this.supplyData.splice(index, 1);
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
        supply_item: this.addItemForm.value.itemName,
        supply_quantity: this.addItemForm.value.quantity,
        supply_date: this.addItemForm.value.dateProduced
      };

      this.supplyData.push(newItem);
      this.applyDateFilter();
      this.addItemForm.reset();
      this.toggleShowAddSupplyForm();
    }
  }

  onUpdate(): void {
    if (this.editItemForm.valid) {
      const index = this.supplyData.findIndex(item => item.supply_item === this.currentItem.supply_item);
      if (index !== -1) {
        this.supplyData[index] = {
          supply_item: this.currentItem.supply_item,
          supply_quantity: this.editItemForm.value.quantity,
          supply_date: this.editItemForm.value.dateProduced
        };

        this.applyDateFilter();
        this.editItemForm.reset();
        this.toggleShowEditSupplyForm();
      }
    }
  }

  downloadData(data: any[], filename: string): void {
    if (data.length === 0) {
      console.error('No data available to download.');
      return;
    }
    
    const csvData = this.convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  convertToCSV(data: any[]): string {
    const array = [Object.keys(data[0])].concat(data);
    return array.map(it => {
      return Object.values(it).toString();
    }).join('\n');
  }

  downloadAllTime(): void {
    this.downloadData(this.supplyData, 'supply_data_all_time.csv');
  }

  downloadMonthToDate(): void {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthToDateData = this.supplyData.filter(record => {
      const supplyDate = new Date(record.supply_date);
      return supplyDate >= startOfMonth && supplyDate <= currentDate;
    });
    this.downloadData(monthToDateData, 'supply_data_month_to_date.csv');
  }

  downloadToday(): void {
    const today = new Date().toISOString().split('T')[0];
    const todayData = this.supplyData.filter(record => {
      const recordDate = new Date(record.supply_date).toISOString().split('T')[0];
      return recordDate === today;
    });
    this.downloadData(todayData, 'supply_data_today.csv');
  }

  downloadCustom(): void {
    this.downloadData(this.filteredSupplyData, 'supply_data_custom.csv');
  }
}
