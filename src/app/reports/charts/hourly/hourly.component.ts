import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../../services/menu.service';
import { LeftsidebarComponent } from '../../../components/leftsidebar/leftsidebar.component';

@Component({
  selector: 'app-hourly',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LeftsidebarComponent,
  ],
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css'],
})
export class HourlyComponent implements OnInit {
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });

    this.menuService.changeHeaderText('Hourly Charts');
  }
}
