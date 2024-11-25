import { TestBed } from '@angular/core/testing';

import { ItemTestService } from './item-test.service';

describe('ItemTestService', () => {
  let service: ItemTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
