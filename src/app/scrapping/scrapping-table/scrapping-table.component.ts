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

  scrapData: { scrap_id: string; scrap_name: string; scrap_quantity: string; scrap_date: string }[] = [];
  filteredScrapData: { scrap_id: string; scrap_name: string; scrap_quantity: string; scrap_date: string }[] = [];
  addItemForm: FormGroup; // Form Group for adding items
  editItemForm: FormGroup; // Form Group for editing items
  products: string[] = ['Pandesal', 'Monay', 'Pan de coco']; // Sample products
  currentItem: any = null; // To hold the item being edited

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
    // Adding sample data for testing

    this.scrapData = [
        { scrap_id: 'B-001', scrap_name: 'Pan de Coco', scrap_quantity: '200', scrap_date: '2024-10-25' },
        { scrap_id: 'B-002', scrap_name: 'Pandesal', scrap_quantity: '300', scrap_date: '2024-10-30' },
        { scrap_id: 'B-003', scrap_name: 'Monay', scrap_quantity: '400', scrap_date: '2024-11-05' },
        { scrap_id: 'B-004', scrap_name: 'Ensaymada', scrap_quantity: '150', scrap_date: '2024-11-30' },
        { scrap_id: 'B-005', scrap_name: 'Spanish Bread', scrap_quantity: '220', scrap_date: '2024-11-15' },
        { scrap_id: 'B-006', scrap_name: 'Cheese Roll', scrap_quantity: '180', scrap_date: '2024-11-20' },
        { scrap_id: 'B-007', scrap_name: 'Putok', scrap_quantity: '190', scrap_date: '2024-12-01' },
        { scrap_id: 'B-008', scrap_name: 'Kalihim', scrap_quantity: '210', scrap_date: '2024-12-05' },
        { scrap_id: 'B-009', scrap_name: 'Kabayan', scrap_quantity: '175', scrap_date: '2024-12-10' },
        { scrap_id: 'B-010', scrap_name: 'Tasty', scrap_quantity: '250', scrap_date: '2024-12-15' },
        { scrap_id: 'B-011', scrap_name: 'Pinagong', scrap_quantity: '300', scrap_date: '2024-12-20' },
        { scrap_id: 'B-012', scrap_name: 'Pan de Sal', scrap_quantity: '350', scrap_date: '2024-12-25' },
        { scrap_id: 'B-013', scrap_name: 'Pan Americano', scrap_quantity: '120', scrap_date: '2025-01-01' },
        { scrap_id: 'B-014', scrap_name: 'Pan Sikal', scrap_quantity: '140', scrap_date: '2025-01-05' },
        { scrap_id: 'B-015', scrap_name: 'Pan Silyo', scrap_quantity: '160', scrap_date: '2025-01-10' },
        { scrap_id: 'B-016', scrap_name: 'Pan Siko', scrap_quantity: '180', scrap_date: '2025-01-15' },
        { scrap_id: 'B-017', scrap_name: 'Pan Siko-Siko', scrap_quantity: '200', scrap_date: '2025-01-20' },
        { scrap_id: 'B-018', scrap_name: 'Pan Tasty', scrap_quantity: '220', scrap_date: '2025-01-25' },
        { scrap_id: 'B-019', scrap_name: 'Pan Elim', scrap_quantity: '240', scrap_date: '2025-01-30' },
        { scrap_id: 'B-020', scrap_name: 'Pan Maria', scrap_quantity: '260', scrap_date: '2025-02-05' },
        { scrap_id: 'B-021', scrap_name: 'Pan de Regla', scrap_quantity: '280', scrap_date: '2025-02-10' },
        { scrap_id: 'B-022', scrap_name: 'Pan de Putok', scrap_quantity: '300', scrap_date: '2025-02-15' },
        { scrap_id: 'B-023', scrap_name: 'Pan de Pugon', scrap_quantity: '320', scrap_date: '2025-02-20' },
        { scrap_id: 'B-024', scrap_name: 'Pan de Bagong', scrap_quantity: '340', scrap_date: '2025-02-25' }
      ];
      
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

  editItem(item: any): void {
    this.currentItem = item;
    this.editItemForm.patchValue({
      productName: item.scrap_name,
      quantity: item.scrap_quantity,
      scrapDate: item.scrap_date
    });
    this.toggleShowEditScrapForm();
  }

  onSubmit(): void {
    if (this.addItemForm.valid) {
      console.log(this.addItemForm.value);
      // Add functionality here
    }
  }

  onUpdate(): void {
    if (this.editItemForm.valid) {
      console.log(this.editItemForm.value);
      // Update functionality here
    }
  }
}
