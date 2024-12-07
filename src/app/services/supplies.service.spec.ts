import { TestBed } from '@angular/core/testing';

import { SuppliesService } from './supplies.service';

describe('SuppliesService', () => {
  let service: SuppliesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuppliesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
