import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

interface ResetResponse {
  message: string;
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
  providers: [AuthService],
})

export default class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  // token!: string;
  authService = inject(AuthService)

  token: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      console.log('Token:', this.token);
    });
    this.resetPasswordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: confirmPasswordValidator('password','confirmPassword')
      }
    )

    // this.activatedRoute.params.subscribe(val=>{
    //   this.token = val['token'];
    //   console.log(this.token)
    // })
  }

  reset(){
    let resetObj = {
      token: this.token,
      password: this.resetPasswordForm.value.password
    }
    console.log(resetObj)
    this.authService.resetPasswordService(resetObj)
    .subscribe({
      next:(res: ResetResponse) => {
        alert(res.message);
        this.resetPasswordForm.reset();
        this.router.navigate(['login'])
      },
      error:(err: { error: ResetResponse }) => {
        alert(err.error.message)
      }
    })
  }
}
