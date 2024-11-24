import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBoardComponent } from './main-board.component';

describe('MainBoardComponent', () => {
  let component: MainBoardComponent;
  let fixture: ComponentFixture<MainBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
