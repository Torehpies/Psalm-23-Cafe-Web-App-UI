import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { AccountManagement } from '../../../models/account-management.model';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';
import { AccountManagementService } from '../../../services/accountmanagement.service';

@Component({
  selector: 'app-account-management-update',
  standalone: true,
  templateUrl: './update.component.html',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ConfirmModalComponent],  
})
export class AccountManagementUpdateComponent {
  @Input() account: AccountManagement | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() accountUpdated = new EventEmitter<void>();

  updateAccountForm: FormGroup;
  roles: string[] = ['admin','manager', 'baker', 'barista', 'cashier', 'helper'];
  showModal: boolean = false;
  modalMessage: string = '';
  isSubmitAction: boolean = false;

  constructor(private fb: FormBuilder, private accountService: AccountManagementService) {
    this.updateAccountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    }, { validators: this.unchangedValidator() });
  }

  ngOnInit() {
    if (this.account) {
      this.updateAccountForm.patchValue({
        firstName: this.account.firstName,
        lastName: this.account.lastName,
        role: this.account.role,
        email: this.account.email
      });
      this.updateAccountForm.updateValueAndValidity();
      this.updateAccountForm.setErrors({ unchanged: true });
      this.updateAccountForm.valueChanges.subscribe(() => {
        this.checkForUnchangedValues();
      });
    }
  }

  unchangedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.account) {
        return null; // Return null if account is not defined
      }
      const formValue = control.value;
      const unchanged = formValue.firstName === this.account.firstName &&
                        formValue.lastName === this.account.lastName &&
                        formValue.role === this.account.role &&
                        formValue.email === this.account.email;
      return unchanged ? { unchanged: true } : null;
    };
  }

  checkForUnchangedValues() {
    if (!this.account) {
      return; // Return if account is not defined
    }
    const formValue = this.updateAccountForm.value;
    const unchanged = formValue.firstName === this.account.firstName &&
                      formValue.lastName === this.account.lastName &&
                      formValue.role === this.account.role &&
                      formValue.email === this.account.email;

    if (unchanged) {
      this.updateAccountForm.setErrors({ unchanged: true });
    } else {
      this.updateAccountForm.setErrors(null);
    }
  }

  closePopup() {
    this.close.emit();
  }

  openCancelModal(): void {
    this.modalMessage = 'Are you sure you want to cancel? All changes will be lost.';
    this.isSubmitAction = false;
    this.showModal = true;
  }

  openSubmitModal(): void {
    this.modalMessage = 'Are you sure you want to update this account?';
    this.isSubmitAction = true;
    this.showModal = true;
  }

  onSubmit(): void {
    this.openSubmitModal();
  }

  onConfirmed(isConfirmed: boolean): void {
    if (isConfirmed) {
      if (this.isSubmitAction) {
        if (this.updateAccountForm.valid && this.account) {
          const formData = this.updateAccountForm.value;
          const updatedAccount: Partial<AccountManagement> = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: formData.role,
            email: formData.email
          };
          this.accountService.updateAccount(this.account._id, updatedAccount).subscribe(
            (response) => {
              console.log('Account updated:', response);
              this.accountUpdated.emit();
              this.closePopup();
            },
            (error) => {
              console.error('Error updating account:', error);
            }
          );
        } else {
          console.log('Form is not valid!');
        }
      }
    }

    this.showModal = false;
    if (!this.isSubmitAction) {
      this.updateAccountForm.reset();
      this.close.emit();
      return;
    }
    this.reloadPage();
    this.close.emit();
  }

  onModalCancel(): void {
    this.showModal = false;
  }

  reloadPage() {
    window.location.reload();
  }

}
