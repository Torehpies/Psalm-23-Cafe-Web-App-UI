import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPanelComponent } from './product-panel.component';

describe('ProductPanelComponent', () => {
  let component: ProductPanelComponent;
  let fixture: ComponentFixture<ProductPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
