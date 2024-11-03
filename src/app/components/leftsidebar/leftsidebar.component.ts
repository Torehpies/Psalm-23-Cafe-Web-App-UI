
import { Component, inject, OnInit,} from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leftsidebar',
  standalone: true,
  imports: [],
  templateUrl: './leftsidebar.component.html',
  styleUrl: './leftsidebar.component.css'
})
export class LeftsidebarComponent implements OnInit {
  router = inject(Router);
  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
      this.menuService.isMenuActive$.subscribe((status) => {
          this.isMenuActive = status;
      });
  }
  
   logout(): void {
    this.menuService.toggleMenu();
    this.router.navigate(['']);
   }

   gotoDashboard(): void {
    this.router.navigate(['dashboard']);
    this.menuService.toggleMenu();
   }

   gotoInventory(): void {
    this.router.navigate(['inventory']);
    this.menuService.toggleMenu();
   }

   gotoReports(): void {
    this.router.navigate(['reports']);
    this.menuService.toggleMenu();
   }

   gotoAccountManagement(): void {
    this.router.navigate(['account-management']);
    this.menuService.toggleMenu();
   }

   gotoAccountMonitoring(): void {
    this.router.navigate(['account-monitoring']);
    this.menuService.toggleMenu();
   }
}
