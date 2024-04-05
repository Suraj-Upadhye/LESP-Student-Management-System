import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './loginpageall.component.html',
  styleUrl: './loginpageall.component.scss',
  providers: [AuthService],
})
export class LoginpageallComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm!: FormGroup;

  role: String = '';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        alert('Login is Success!');
        console.log(res.data);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        

        if (res.data.hasOwnProperty('admin')) {
          localStorage.setItem(
            'user_name',
            res.data.admin.firstName + ' ' + res.data.admin.lastName
          );
          localStorage.setItem('_id', res.data.admin._id)
          this.role = res.data.admin.role;
          localStorage.setItem('role', res.data.admin.role);
          console.log(this.role);
        } else if (res.data.hasOwnProperty('user')) {
          localStorage.setItem(
            'user_name',
            res.data.user.firstName + ' ' + res.data.user.lastName
          );
          localStorage.setItem('_id', res.data.user._id);
          this.role = res.data.user.role;
          localStorage.setItem('role', res.data.user.role);
        }

        // localStorage.setItem("user_id", res.data._id);
        this.authService.isloggedIn$.next(true);

        if (this.role == 'Teacher') {
          this.router.navigate(['homepage-teacher-hod']);
        } else if (this.role == 'HOD') {
          this.router.navigate(['homepage-teacher-hod']);
        } else if (this.role == 'Student') {
          this.router.navigate(['homepage-student']);
        }

        this.loginForm.reset();
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }
}
