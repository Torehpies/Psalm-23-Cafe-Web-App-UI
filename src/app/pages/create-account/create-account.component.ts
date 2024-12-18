import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router} from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
  providers: [AuthService],
})
export default class CreateAccountComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  createAccountForm !: FormGroup;

  ngOnInit(): void{
    this.createAccountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validators: confirmPasswordValidator('password','confirmPassword')
    }
    );
  }

  register(){
    this.authService.registerService(this.createAccountForm.value)
    .subscribe({
        next:(res)=>{
          alert("User Created")
          this.createAccountForm.reset();
          this.router.navigate(['']);
          
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }

  /*
    errorMessage: string | null = null;

  isPromptVisible: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  goBack() {
    this.router.navigate(['..']);
  }

  showPopup() {
    this.isPromptVisible = true;
  }

  closePopup() {
    this.isPromptVisible = false;
  }

  confirmSubmit() {
    if (this.firstName && this.lastName && this.email && this.password && this.role) {
      this.authService.createAccount(this.firstName, this.lastName, this.email, this.password, this.role).subscribe({
        next: (response) => {
          console.log('Account created successfully:', response);
          this.errorMessage = null;
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Account creation failed:', err);
          this.errorMessage = 'There was an error creating your account. Please try again.';
        }
      });

      this.closePopup();
    } else {
      this.errorMessage = 'Please fill in all fields.';
    }
  }

  togglePasswordVisibility(event: Event) {
    const inputField = (event.target as HTMLElement).previousElementSibling as HTMLInputElement;
    inputField.type = inputField.type === 'password' ? 'text' : 'password';
  }
  */
}
