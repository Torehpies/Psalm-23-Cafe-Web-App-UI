import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemTestService } from '../../services/item-test.service';

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

  constructor(private itemTestService: ItemTestService) {}

  ngOnInit() {
    if (this.item) {
      this.loadRestockHistory(this.item.name); // Load the item's history on initialization
    }
  }

  // Fetch and filter history for the specific item
  loadRestockHistory(itemName: string) {
    const allHistory = this.itemTestService.getHistory();
    this.restockHistory = allHistory.filter((history) => history.name === itemName);
  }

  closeModal() {
    this.close.emit();
  }

  openRestock() {
    this.visible.emit();
    this.close.emit();
  }

}
