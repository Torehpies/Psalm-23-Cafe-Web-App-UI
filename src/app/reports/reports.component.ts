import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { LeftsidebarComponent } from '../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [LeftsidebarComponent, HeaderComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
      this.menuService.isMenuActive$.subscribe((status) => {
          this.isMenuActive = status;
      });
  }
}
