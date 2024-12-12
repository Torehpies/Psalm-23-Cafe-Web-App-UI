import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SuppliesService } from '../../../services/supplies.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule],  // Include ItemRestockComponent here
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent {
  @Input() item: any;  // Ensure this input is properly passed from the parent
  @Output() close = new EventEmitter<void>();
  @Output() visible = new EventEmitter<void>();

  restockHistory: any[] = []; // Filtered restock history for the current item

  constructor(private suppliesService: SuppliesService) {}

  ngOnInit() {
    if (this.item) {
      console.log('Item:', this.item); // Debug: Log the item
      this.loadRestockHistory(this.item._id); // Load the item's history on initialization
    }
  }

  // Fetch and filter history for the specific item
  loadRestockHistory(itemId: string) {
    this.suppliesService.getsupplyHistory().subscribe((allHistory: any[]) => {
      console.log('All History:', allHistory); // Debug: Log all history data
      this.restockHistory = allHistory.filter((history) => history.ingredient._id._id === itemId);
      console.log('Filtered History:', this.restockHistory); // Debug: Log filtered history data
    });
  }

  closeModal() {
    this.close.emit();
  }

  openRestock() {
    this.visible.emit();
    this.close.emit();
  }

}
