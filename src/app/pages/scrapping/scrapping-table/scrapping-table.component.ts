import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScrappingService } from '../../../services/scrapping.service';
import { SuppliesService } from '../../../services/supplies.service';
import { ProductsService } from '../../../services/products.service';
import { Scrapping } from '../../../models/scrapping.model';
import { AddScrapModalComponent } from './add-scrap-modal/add-scrap-modal.component';
import { EditScrapModalComponent } from './edit-scrap-modal/edit-scrap-modal.component';
import { DeleteConfirmationModalComponent } from './delete-confirmation-modal/delete-confirmation-modal.component';
import { AuthService } from '../../../services/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-scrapping-table',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, 
    AddScrapModalComponent, EditScrapModalComponent, DeleteConfirmationModalComponent],
  templateUrl: './scrapping-table.component.html',
  styleUrls: ['./scrapping-table.component.css']
})
export class ScrappingTableComponent implements OnInit {
  isAddActive = true;
  fromDate = '';
  toDate = '';
  showAddForm = false;
  showEditForm = false;
  showDeleteConfirm = false;
  showStatusModal = false;
  statusMessage = '';

  scrapData: Scrapping[] = [];
  newScrapData: Scrapping[] = [];
  filteredScrapData: Scrapping[] = [];
  supplyData: any[] = [];
  productData: any[] = [];
  addItemForm: FormGroup;
  editItemForm: FormGroup;
  selectedItem: any;
  index: number | null = null;

  scrappingService = inject(ScrappingService);
  suppliesService = inject(SuppliesService);
  productsService = inject(ProductsService);
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
      itemType: ['', Validators.required],
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      scrapDate: ['', Validators.required]
    });
  }

  private createEditItemForm(): FormGroup {
    return this.fb.group({
      itemType: ['', Validators.required],
      itemName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      scrapDate: ['', Validators.required]
    });
  }

  private initializeData(): void {
    forkJoin({
      supplies: this.suppliesService.getSupplies(),
      products: this.productsService.getProducts(),
      scrapping: this.scrappingService.fetchScrappingData()
    }).subscribe({
      next: ({ supplies, products, scrapping }) => {
        this.supplyData = supplies;
        this.productData = products.data;
        this.scrapData = scrapping.data.sort((a, b) => new Date(b.usedAt).getTime() - new Date(a.usedAt).getTime());
        localStorage.setItem('supplyData', JSON.stringify(supplies));
        localStorage.setItem('products', JSON.stringify(products.data));
        localStorage.setItem('scrapData', JSON.stringify(scrapping.data));
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
    if (!this.isAddActive) {
      const fromDateObj = this.fromDate ? new Date(this.fromDate) : null;
      const toDateObj = this.toDate ? new Date(this.toDate) : null;
      this.filteredScrapData = this.scrapData.filter(record => {
        const scrapDateObj = new Date(record.usedAt);
        return (!fromDateObj || scrapDateObj >= fromDateObj) && (!toDateObj || scrapDateObj <= toDateObj);
      }).sort((a, b) => new Date(b.usedAt).getTime() - new Date(a.usedAt).getTime());
    } else {
      this.filteredScrapData = this.newScrapData.sort((a, b) => new Date(b.usedAt).getTime() - new Date(a.usedAt).getTime());
    }
    // console.log('Filtered scrap data:', this.filteredScrapData); // Debug log
  }

  editItem(index: number): void {
    this.index = index
    this.selectedItem = this.newScrapData[index];
    this.showEditForm = true;
  }

  deleteItem(index: number): void {
    this.index = index;
    this.showDeleteConfirm = true;
  }

  confirmDelete(): void {

    if (this.index !== null) {
      this.newScrapData.splice(this.index, 1);
    }
    this.showDeleteConfirm = false;
  }

  cancelDelete(): void {
    this.index = null;
    this.showDeleteConfirm = false;
  }

  onSubmit(newScrap: any): void {
    const newScrapItem: Scrapping = {
      itemType: newScrap.itemType,
      itemId: newScrap.itemId,
      itemName: newScrap.itemName,
      quantity: newScrap.quantity,
      usedAt: newScrap.scrapDate,
      employee: this.authService.getUserId()
    };
    this.newScrapData.push(newScrapItem);
    // this.applyDateFilter();
    this.showAddForm = false;
  }

  onUpdate(updatedItem: any): void {
    // console.log('Updated item:', updatedItem); // Debug log
    if(this.index !== null) {
      this.newScrapData[this.index] = {
        ... updatedItem,
        usedAt: updatedItem.scrapDate,
        employee: this.authService.getUserId()
      };
      this.applyDateFilter();
      this.showEditForm = false;
    }
  }

  submitScrapData(): void {
    if (this.newScrapData.length > 0) {
      let completedRequests = 0;
      for (const scrap of this.newScrapData) {
        this.scrappingService.addScrapping(scrap).subscribe({
          next: () => {
            completedRequests++;
            if (completedRequests === this.newScrapData.length) {
              this.newScrapData = [];
              this.applyDateFilter();
              this.refetchData(); // Refetch data after successful submission
              this.showStatus('Data submitted successfully');
            }
          },
          error: (error) => {
            console.error('Error submitting scrapping data:', error);
            this.showStatus('Error submitting data');
          }
        });
      }
    }
  }

  private refetchData(): void {
    forkJoin({
      supplies: this.suppliesService.getSupplies(),
      products: this.productsService.getProducts(),
      scrapping: this.scrappingService.fetchScrappingData()
    }).subscribe({
      next: ({ supplies, products, scrapping }) => {
        this.supplyData = supplies;
        this.productData = products.data;
        this.scrapData = scrapping.data.sort((a, b) => new Date(b.usedAt).getTime() - new Date(a.usedAt).getTime());
        localStorage.setItem('supplyData', JSON.stringify(supplies));
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('scrapData', JSON.stringify(scrapping.data));
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
    const filteredData = this.scrapData.filter(record => {
      const scrapDateObj = new Date(record.usedAt);
      const fromDateObj = this.fromDate ? new Date(this.fromDate) : null;
      const toDateObj = this.toDate ? new Date(this.toDate) : null;
      return (!fromDateObj || scrapDateObj >= fromDateObj) && (!toDateObj || scrapDateObj <= toDateObj);
    });
    this.downloadCSV(filteredData, 'custom_range_scrap.csv');
  }

  downloadAllTime(): void {
    const allData = JSON.parse(localStorage.getItem('scrapData') || '[]');
    this.downloadCSV(allData, 'all_time_scrap.csv');
  }

  downloadMonthToDate(): void {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const filteredData = this.scrapData.filter(record => {
      const scrapDateObj = new Date(record.usedAt);
      return scrapDateObj >= firstDayOfMonth && scrapDateObj <= currentDate;
    });
    this.downloadCSV(filteredData, 'month_to_date_scrap.csv');
  }

  downloadToday(): void {
    const currentDate = new Date();
    const filteredData = this.scrapData.filter(record => {
      const scrapDateObj = new Date(record.usedAt);
      return scrapDateObj.toDateString() === currentDate.toDateString();
    });
    this.downloadCSV(filteredData, 'today_scrap.csv');
  }

}
