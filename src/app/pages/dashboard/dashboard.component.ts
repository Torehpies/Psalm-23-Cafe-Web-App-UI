import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';
import { MenuService } from '../../services/menu.service';
import { MainBoardComponent } from './main-board/main-board.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { DailyComponent } from './daily/daily.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LeftsidebarComponent,HeaderComponent, MainBoardComponent, DateTimeComponent, DailyComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  isMenuActive: boolean = false;
  authService = inject(AuthService);

  constructor(private menuService: MenuService) {}

  ngOnInit() {
      this.menuService.isMenuActive$.subscribe((status) => {
          this.isMenuActive = status;
      });
      this.menuService.changeHeaderText('Welcome, Baker!');
  }

  // update(){
  //   this.authService.isUserIn$.next(true);
  // }
  // unupdate(){
  //   this.authService.isUserIn$.next(false);
  // }
}
