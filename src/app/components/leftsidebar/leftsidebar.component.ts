
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
   //gian changes
   gotoSupplies(): void {
    this.router.navigate(['supplies']);
    this.menuService.toggleMenu();
   }

   gotoclockin(): void {
    this.router.navigate(['clock-in']);
    this.menuService.toggleMenu();
   }

   gotoProduction(): void {
    this.router.navigate(['production']);
    this.menuService.toggleMenu();
   }

   gotoScrapping(): void {
    this.router.navigate(['scrapping']);
    this.menuService.toggleMenu();
   }
   //until here
}
