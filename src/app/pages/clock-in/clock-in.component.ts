import { Component } from '@angular/core';
import { LeftsidebarComponent } from '../../components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MenuService } from '../../services/menu.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

@Component({
  selector: 'app-clock-in',
  standalone: true,
  imports: [LeftsidebarComponent, HeaderComponent, UserProfileComponent],
  templateUrl: './clock-in.component.html',
  styleUrl: './clock-in.component.css'
})
export default class ClockInComponent {

  isMenuActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
      this.menuService.isMenuActive$.subscribe((status) => {
          this.isMenuActive = status;       
      });
      this.menuService.changeHeaderText('Clock-In');
  }

}
