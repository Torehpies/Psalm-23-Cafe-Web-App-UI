
import { Component, OnInit,} from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-leftsidebar',
  standalone: true,
  imports: [],
  templateUrl: './leftsidebar.component.html',
  styleUrl: './leftsidebar.component.css'
})
export class LeftsidebarComponent implements OnInit {
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
      this.menuService.isMenuActive$.subscribe((status) => {
          this.isMenuActive = status;
      });
  }
}
