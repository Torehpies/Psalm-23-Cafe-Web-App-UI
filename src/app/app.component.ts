import { Component, effect, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LeftsidebarComponent } from './components/leftsidebar/leftsidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterModule, LeftsidebarComponent, HeaderComponent, CommonModule ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Psalms-23-Cafe-Web-UI';
  
}