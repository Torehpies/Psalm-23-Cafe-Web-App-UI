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
  currentItem: any = null;

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
        this.scrapData = scrapping.data;
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
      });
    } else {
      this.filteredScrapData = this.newScrapData;
    }
    // console.log('Filtered scrap data:', this.filteredScrapData); // Debug log
  }

  editItem(item: any): void {
    this.currentItem = item;
    this.editItemForm.patchValue({
      itemType: item.itemType,
      itemName: item.itemName,
      quantity: item.quantity,
      scrapDate: item.usedAt
    });
    this.showEditForm = true;
  }

  deleteItem(item: any): void {
    this.currentItem = item;
    this.showDeleteConfirm = true;
  }

  confirmDelete(): void {
    const index = this.newScrapData.findIndex(record => record._id === this.currentItem._id);
    if (index !== -1) {
      this.newScrapData.splice(index, 1);
      this.applyDateFilter();
    }
    this.showDeleteConfirm = false;
  }

  cancelDelete(): void {
    this.currentItem = null;
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
    this.applyDateFilter();
    this.showAddForm = false;
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
        this.scrapData = scrapping.data;
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

  onUpdate(updatedItem: any): void {
    if (this.editItemForm.valid) {
      const itemType = updatedItem.itemType;
      const itemName = updatedItem.itemName;
      const item = itemType === 'Supply' ? this.supplyData.find(item => item.name === itemName) : this.productData.find(item => item.name === itemName);

      const index = this.newScrapData.findIndex(record => record._id === this.currentItem._id);
      if (index !== -1) {
        this.newScrapData[index] = {
          ...this.newScrapData[index],
          itemType: updatedItem.itemType,
          itemId: item._id,
          itemName: item.name,
          quantity: updatedItem.quantity,
          usedAt: updatedItem.scrapDate
        };
        this.applyDateFilter();
        this.editItemForm.reset();
        this.showEditForm = false;
      }
    }
  }
}
