import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountManagementUpdateComponent } from './update.component'; 
import { FormsModule } from '@angular/forms';

describe('AccountManagementUpdateComponent', () => {
  let component: AccountManagementUpdateComponent;
  let fixture: ComponentFixture<AccountManagementUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountManagementUpdateComponent ],
      imports: [ FormsModule ] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide the form when close button is clicked', () => {
    expect(component.isFormVisible).toBeTrue();

    component.closePopup();

    expect(component.isFormVisible).toBeFalse();
  });

});
