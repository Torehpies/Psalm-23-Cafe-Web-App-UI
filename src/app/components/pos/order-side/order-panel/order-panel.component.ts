import { Component } from '@angular/core';
import { OrderlistComponent } from '../orderlist/orderlist.component';
import { PaymentinputComponent } from '../paymentinput/paymentinput.component';

@Component({
  selector: 'app-order-panel',
  standalone: true,
  imports: [OrderlistComponent,PaymentinputComponent],
  templateUrl: './order-panel.component.html',
  styleUrl: './order-panel.component.css'
})
export class OrderPanelComponent {

}
