import { TestBed } from '@angular/core/testing';

import { PaymentinputService } from './paymentinput.service';

describe('PaymentinputService', () => {
  let service: PaymentinputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentinputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
