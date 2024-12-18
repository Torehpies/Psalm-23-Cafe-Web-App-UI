import { Component, inject, OnInit,} from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ADMIN_ROLES, PRODUCTION_ROLES, COUNTER_ROLES } from '../../models/role/role.model';

@Component({
  selector: 'app-leftsidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leftsidebar.component.html',
  styleUrl: './leftsidebar.component.css'
})
export class LeftsidebarComponent implements OnInit {
  router = inject(Router);
  isMenuActive: boolean = false;
  userRole: string = "";

  authService = inject(AuthService);

  admin_roles: string[] = ADMIN_ROLES;
  production_roles: string[] = PRODUCTION_ROLES;
  counter_roles: string[] = COUNTER_ROLES;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.isMenuActive$.subscribe((status) => {
        this.isMenuActive = status;
    });
    this.userRole = this.authService.getUserRole() ?? "";
  }
  
   logout(){
    this.menuService.toggleMenu();
    this.router.navigate(['login']);
    this.authService.logoutService();
    // localStorage.removeItem("authToken");
   }

   gotoDashboard(): void {
    this.router.navigate(['home']);
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

    gotoPos(): void {
      this.router.navigate(['pos']);
      this.menuService.toggleMenu();
    }


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
}
