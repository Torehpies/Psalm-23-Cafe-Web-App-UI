import { Component } from '@angular/core';
import { LeftsidebarComponent } from '../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { MenuService } from '../services/menu.service';
@Component({
  selector: 'app-scrapping',
  standalone: true,
  imports: [LeftsidebarComponent, HeaderComponent],
  templateUrl: './scrapping.component.html',
  styleUrl: './scrapping.component.css'
})
export class ScrappingComponent {
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
      this.menuService.isMenuActive$.subscribe((status) => {
          this.isMenuActive = status;       
      });
      this.menuService.changeHeaderText('Scrapping');
  }

}
