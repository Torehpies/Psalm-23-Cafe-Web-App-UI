import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMonitoringComponent } from './account-monitoring.component';

describe('AccountMonitoringComponent', () => {
  let component: AccountMonitoringComponent;
  let fixture: ComponentFixture<AccountMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountMonitoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
