import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-scrapping-table',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './scrapping-table.component.html',
  styleUrls: ['./scrapping-table.component.css']
})
export class ScrappingTableComponent {

  isAddActive: boolean = true; // Initial state: "ADD" is active
  fromDate: string = ''; // Initialize fromDate
  toDate: string = ''; // Initialize toDate
  showAddForm: boolean = false; // State to control visibility of the form
  showEditForm: boolean = false; // State to control visibility of the edit form
  showDeleteConfirm: boolean = false; // State to control visibility of the delete confirmation

  scrapData: { scrap_id: string; scrap_name: string; scrap_quantity: string; scrap_date: string }[] = [];
  filteredScrapData: { scrap_id: string; scrap_name: string; scrap_quantity: string; scrap_date: string }[] = [];
  addItemForm: FormGroup; // Form Group for adding items
  editItemForm: FormGroup; // Form Group for editing items
  products: string[] = ['Pandesal', 'Monay', 'Pan de coco']; // Sample products
  currentItem: any = null; // To hold the item being edited or deleted

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.addItemForm = this.fb.group({
      productName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      scrapDate: ['', Validators.required],
    });

    this.editItemForm = this.fb.group({
      productName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      scrapDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadscrapData();
    this.applyDateFilter(); // Apply initial filter
  }

  toggleView(): void {
    this.isAddActive = !this.isAddActive;
    this.applyDateFilter();
  }

  loadscrapData(): void {
    this.http.get<{ scrap_id: string; scrap_name: string; scrap_quantity: string; scrap_date: string }[]>('/api/worker-scrap-data')
      .subscribe(
        (data) => {
          this.scrapData = data;
          this.applyDateFilter();
        },
        (error) => {
          console.error('Error fetching supply data:', error);
        }
      );
  }

  applyDateFilter(): void {
    if (this.isAddActive || !this.fromDate || !this.toDate) {
      this.filteredScrapData = this.scrapData; // Show all data when in add mode or no date selected
    } else {
      const fromDateObj = new Date(this.fromDate);
      const toDateObj = new Date(this.toDate);
      this.filteredScrapData = this.scrapData.filter(record => {
        const scrapDateObj = new Date(record.scrap_date);
        return scrapDateObj >= fromDateObj && scrapDateObj <= toDateObj;
      });
    }
  }

  toggleShowAddScrapForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  toggleShowEditScrapForm(): void {
    this.showEditForm = !this.showEditForm;
  }

  toggleShowDeleteConfirm(): void {
    this.showDeleteConfirm = !this.showDeleteConfirm;
  }

  editItem(item: any): void {
    this.currentItem = item;
    this.editItemForm.patchValue({
      productName: item.scrap_name,
      quantity: item.scrap_quantity,
      scrapDate: item.scrap_date
    });
    this.toggleShowEditScrapForm();
  }

  deleteItem(item: any): void {
    this.currentItem = item;
    this.toggleShowDeleteConfirm();
  }

  confirmDelete(): void {
    const index = this.scrapData.findIndex(item => item.scrap_id === this.currentItem.scrap_id);
    if (index !== -1) {
      this.scrapData.splice(index, 1);
      this.applyDateFilter(); // Update the filtered data
    }
    this.toggleShowDeleteConfirm(); // Close the delete confirmation
  }

  cancelDelete(): void {
    this.currentItem = null;
    this.toggleShowDeleteConfirm(); // Close the delete confirmation
  }

  onSubmit(): void {
    if (this.addItemForm.valid) {
      const newItem = {
        scrap_id: 'B-' + (this.scrapData.length + 1).toString().padStart(3, '0'), // Generate new ID
        scrap_name: this.addItemForm.value.productName,
        scrap_quantity: this.addItemForm.value.quantity,
        scrap_date: this.addItemForm.value.scrapDate
      };

      this.scrapData.push(newItem);
      this.applyDateFilter(); // Update the filtered data

      this.addItemForm.reset(); // Clear the form
      this.toggleShowAddScrapForm(); // Close the add form
    }
  }

  onUpdate(): void {
    if (this.editItemForm.valid) {
      const index = this.scrapData.findIndex(item => item.scrap_id === this.currentItem.scrap_id);
      if (index !== -1) {
        this.scrapData[index] = {
          scrap_id: this.currentItem.scrap_id,
          scrap_name: this.editItemForm.value.productName,
          scrap_quantity: this.editItemForm.value.quantity,
          scrap_date: this.editItemForm.value.scrapDate
        };

        this.applyDateFilter(); // Update the filtered data

        this.editItemForm.reset(); // Clear the form
        this.toggleShowEditScrapForm(); // Close the edit form
      }
    }
  }
}
