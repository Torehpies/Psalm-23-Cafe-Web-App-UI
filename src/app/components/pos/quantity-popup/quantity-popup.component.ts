import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Product } from '../../../models/product/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LineItem } from '../../../models/lineItem/lineItem.model';
import { Size } from '../../../models/product/product.model';

@Component({
  standalone: true,
  selector: 'app-quantity-popup',
  templateUrl: './quantity-popup.component.html',
  styleUrls: ['./quantity-popup.component.css'],
  imports: [CommonModule, FormsModule]
})
export class QuantityPopupComponent implements OnInit{
  
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() lineItemConfirm = new EventEmitter<LineItem>();

  quantity: number = 1;

  lineItem: LineItem = {
    _id: this.product?._id,
    name: this.product?.name,
    quantity: this.quantity,
    price: this.product?.price,
    sizes: this.product?.sizes
  }

  ngOnInit(): void {
    if (this.product) {
      this.lineItem = {
        _id: this.product._id,
        name: this.product.name,
        quantity: this.quantity,
        price: this.product.price,
        sizes: this.product.sizes
      }
    }
  }

  onConfirm() {
    this.lineItem.quantity = this.quantity;
    this.lineItemConfirm.emit(this.lineItem);
    this.close.emit();
  }

  onCancel() {
    this.close.emit();
  }
}