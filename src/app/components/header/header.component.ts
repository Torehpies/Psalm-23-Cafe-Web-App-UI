import { Component, OnInit, inject, effect, computed, Signal } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isMenuActive: boolean = false;
  private menuService = inject(MenuService);
  // authService = inject(AuthService);

  // isLoggedIn = computed(() => this.authService.isLoggedInSignal());

  get headerText() {
    return this.menuService.headerText;
  }
  

  ngOnInit() {
      this.menuService.isMenuActive$.subscribe(status => {
          this.isMenuActive = status; // Update local state
      });
  }

  toggleMenu() {
      this.menuService.toggleMenu(); // Toggle the menu state in the service
  }
  
}
