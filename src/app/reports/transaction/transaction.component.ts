import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LeftsidebarComponent, // Include only the left sidebar here
  ],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    // Keep the header as "Reports"
    this.menuService.changeHeaderText('Reports');
  }
}
