import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrappingTableComponent } from './scrapping-table.component';

describe('ScrappingTableComponent', () => {
  let component: ScrappingTableComponent;
  let fixture: ComponentFixture<ScrappingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrappingTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrappingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
