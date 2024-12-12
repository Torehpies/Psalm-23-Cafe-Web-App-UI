import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';
import { MenuService } from '../../../services/menu.service';
import { ItemRestockComponent } from '../item-restock/item-restock.component';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { SuppliesService } from '../../../services/supplies.service';

@Component({
  selector: 'app-restock-form',
  standalone: true,
  imports: [CommonModule, ConfirmModalComponent, ItemRestockComponent, ReactiveFormsModule],
  templateUrl: './restock-form.component.html',
  styleUrl: './restock-form.component.css'
})
export class RestockFormComponent {
  @Output() visible = new EventEmitter<void>();
  @Output() restockConfirmed = new EventEmitter<void>();
  isMenuActive: boolean = false;
  showModal: boolean = false;
  modalMessage: string = '';
  isSubmitAction: boolean = false;
  showRestock: boolean = false;
  restockForm: FormGroup;
  rowToDelete: number | null = null;

  constructor(private menuService: MenuService, private fb: FormBuilder, private suppliesService: SuppliesService) {
    this.restockForm = this.fb.group({
      rows: this.fb.array([])
    })
  }
  
  get rows() {
    return this.restockForm.get('rows') as FormArray;
  }

  ngOnInit() {
    // Subscribe to menu status updates
    this.menuService.isMenuActive$.subscribe((status) => {
    this.isMenuActive = status;
    });
  }

  openCancelModal(): void {
    this.modalMessage = 'Are you sure you want to cancel? All changes will be lost.';
    this.isSubmitAction = false;  // Set to false for cancel action
    this.showModal = true;
  }

  openSubmitModal(): void {
    this.modalMessage = 'Are you sure you want to restock these items?';
    this.isSubmitAction = true;  // Set to true for submit action
    this.showModal = true;
  }

  openRestock() {
    this.showRestock = true;
  }

  closeRestock() {
    this.showRestock = false;
  }
  
  onSubmit(): void{
    this.openSubmitModal();
  }

   // Handle the received item from the ItemRestockComponent
   onRestockItem(item: any) {
    this.addRestockItem(item); // Add the restocked item to the form
    this.showRestock = false; // Close the restock form modal
  }


  addRestockItem(row: {
    _id: string;
    name: string;
    quanitity: number;
    expireDate: string; 
    price: number; 
  }) {
    this.rows.push(this.fb.group(row));
  }

  confirmDeleteRow(index: number): void {
    this.modalMessage = 'Are you sure you want to delete this item?';
    this.isSubmitAction = false;  // Set to false for delete action
    this.rowToDelete = index;
    this.showModal = true;
  }

  deleteRow(index: number): void {
    this.rows.removeAt(index);
  }

  onConfirmed(isConfirmed: boolean): void {
    if (isConfirmed) {
      if (this.rowToDelete != null) {
        this.deleteRow(this.rowToDelete);
        this.rowToDelete = null;
        this.showModal = false;
        return
      }
      if (this.isSubmitAction) {
        const restocks = this.restockForm.value.rows;
        restocks.forEach((restock : any) => {
          this.suppliesService.updateSupply(restock._id, { currentStock: restock.quantity }).subscribe();
          this.suppliesService.addStockHistory({
            ingredient: { _id: restock._id },
            Price: restock.price,
            Quantity: restock.quantity,
            Date: new Date(),
            ExpiryDate: new Date(restock.expireDate)
          }).subscribe();
        });
      }
      this.showModal = false;
      if (!this.isSubmitAction) {
        this.restockForm.reset();
      }
      this.visible.emit();
      this.restockConfirmed.emit(this.restockForm.value.rows); // Emit event with updated restock items
      this.reloadPage();
    }
  }

  onModalCancel(): void {
    this.showModal = false;
  }

  closeRestockForm() {
    this.visible.emit();
  }

  reloadPage() {
    window.location.reload();
  }

  debugRestock() {
    console.log('Restock Form Values:', this.restockForm.value);
    const restocks = this.restockForm.value.rows;
    restocks.forEach((restock: any) => {
      this.suppliesService.updateSupply(restock._id, { currentStock: restock.quantity }).subscribe(response => {
        console.log('Update Supply Response:', response);
      });
      this.suppliesService.addStockHistory({
        ingredient: { _id: restock._id },
        Price: restock.price,
        Quantity: restock.quantity,
        Date: new Date(),
        ExpiryDate: new Date(restock.expireDate)
      }).subscribe(response => {
        console.log('Add Stock History Response:', response);
      });
    });
  }
}
