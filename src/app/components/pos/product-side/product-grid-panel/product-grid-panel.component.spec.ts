import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGridPanelComponent } from './product-grid-panel.component';

describe('ProductGridPanelComponent', () => {
  let component: ProductGridPanelComponent;
  let fixture: ComponentFixture<ProductGridPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductGridPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductGridPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
