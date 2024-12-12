import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentinputComponent } from './paymentinput.component';

describe('PaymentinputComponent', () => {
  let component: PaymentinputComponent;
  let fixture: ComponentFixture<PaymentinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentinputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
