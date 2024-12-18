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
  selectedSize: string | undefined = '';

  lineItem: LineItem = {
    _id: this.product?._id,
    name: this.product?.name,
    quantity: this.quantity,
    price: this.product?.price,
    sizes: this.product?.sizes,
    selectedSize: this.selectedSize,
    category: this.product?.category // Include category
  }

  ngOnInit(): void {
    if (this.product) {
      this.lineItem = {
        _id: this.product._id,
        name: this.product.name,
        quantity: this.quantity,
        price: this.product.price,
        sizes: this.product.sizes,
        selectedSize: this.selectedSize,
        category: this.product.category // Include category
      };
      if (this.product.sizes && this.product.sizes.length > 0) {
        this.selectedSize = this.product.sizes[0].size; // Set default size
      }
    }
  }

  onConfirm() {
    this.lineItem.quantity = this.quantity;
    this.lineItem.selectedSize = this.selectedSize;
    const selectedSizeObj = this.product?.sizes.find(size => size.size === this.selectedSize);
    if (selectedSizeObj) {
      this.lineItem.price = selectedSizeObj.price;
    }
    this.lineItemConfirm.emit(this.lineItem);
    this.close.emit();
  }

  onCancel() {
    this.close.emit();
  }
}