import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReappealComponent } from './reappeal.component';

describe('ReappealComponent', () => {
  let component: ReappealComponent;
  let fixture: ComponentFixture<ReappealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReappealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReappealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
