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
}
