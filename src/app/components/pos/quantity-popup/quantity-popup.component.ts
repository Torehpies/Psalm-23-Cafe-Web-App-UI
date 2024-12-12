
import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-quantity-popup',
  templateUrl: './quantity-popup.component.html',
  styleUrls: ['./quantity-popup.component.css'],
  imports: [CommonModule, FormsModule]
})
export class QuantityPopupComponent {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() quantitySelected = new EventEmitter<number>();

  quantity: number = 1;

  onConfirm() {
    this.quantitySelected.emit(this.quantity);
    this.close.emit();
  }

  onCancel() {
    this.close.emit();
  }
}