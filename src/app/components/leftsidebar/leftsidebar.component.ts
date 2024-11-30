
import { Component, inject, OnInit,} from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  authService = inject(AuthService);
  isLoggedIn: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.authService.isLoggedIn();
    });
    this.menuService.isMenuActive$.subscribe((status) => {
        this.isMenuActive = status;
    });
  }
  
   logout(){
    this.menuService.toggleMenu();
    this.router.navigate(['']);
    localStorage.removeItem("user_id");
    this.authService.isLoggedIn$.next(false);
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

   gotoProductManagement(): void {
      this.router.navigate(['product-management']);
      this.menuService.toggleMenu();
     }

   /*gian changes
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
   }*/
}
