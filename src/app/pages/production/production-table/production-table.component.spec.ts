import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionTableComponent } from './production-table.component';

describe('ProductionTableComponent', () => {
  let component: ProductionTableComponent;
  let fixture: ComponentFixture<ProductionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
