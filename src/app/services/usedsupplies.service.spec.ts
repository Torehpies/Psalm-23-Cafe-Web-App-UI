import { TestBed } from '@angular/core/testing';

import { UsedsuppliesService } from './usedSupplies.service';

describe('UsedsuppliesService', () => {
  let service: UsedsuppliesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsedsuppliesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
