import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { LeftsidebarComponent } from '../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [LeftsidebarComponent, HeaderComponent, FormsModule, RouterModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
      this.isMenuActive = status;
    });
    this.menuService.changeHeaderText('Reports');
  }
}
