import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesComponent } from './supplies.component';

describe('SuppliesComponent', () => {
  let component: SuppliesComponent;
  let fixture: ComponentFixture<SuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
