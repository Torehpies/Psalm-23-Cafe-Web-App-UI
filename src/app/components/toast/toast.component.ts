import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  @Input() message: string | null = null;
  @Input() duration: number = 3000; // Duration in milliseconds
  isVisible: boolean = false;

  ngOnInit() {
    if (this.message) {
      this.show();
    }
  }

  show() {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, this.duration);
  }
} 