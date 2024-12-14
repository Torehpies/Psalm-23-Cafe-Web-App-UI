import { Component } from '@angular/core';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [],
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent {
  totalCustomers: number = 200;
  topSellers = {
    pandesal: 54,
    okinawaMilktea: 23,
    mochaCake: 10
  };
}
