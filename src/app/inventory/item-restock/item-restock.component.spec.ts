import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRestockComponent } from './item-restock.component';

describe('ItemRestockComponent', () => {
  let component: ItemRestockComponent;
  let fixture: ComponentFixture<ItemRestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemRestockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemRestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
