import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpass',
  standalone: true,
  templateUrl: './resetpass.component.html',
  styleUrl: './resetpass.component.css',
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  providers: [AuthService]
})
export class ResetpassComponent {
  [x: string]: any;

  authService = inject(AuthService);
  router = inject(Router)
  
  newPassword: string = '';
  confirmPassword: string = '';

  role: String = '';


  onClickResetPassword() {
    if (this.newPassword !== '') {
      if (this.newPassword === this.confirmPassword) {
        this.newPassword = '';
        this.confirmPassword = '';
        alert('Password successfully changed.');
      }
    } else {
      alert('Passwords do not match.');
      return;
    }
  }


  constructor(
    private route: ActivatedRoute
  ) { }


  resetPassword() {
    const token = this.route.snapshot.params['token']; // Accessing reset token from route parameters
    this.authService.resetPasswordService(token, this.newPassword).subscribe({
      next: (res) => {
        alert("Password Resetted Successfully!")
        console.log(res);
        this.router.navigate(["login"])
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  skipResetPassword(){
    const token = this.route.snapshot.params['token']; // Accessing reset token from route parameters
    this.authService.skipResetPasswordService(token).subscribe({
      next: (res) => {
        console.log(res);
        const email = res.data.email;
        this.loginByEmail(email)
        console.log(email)

        // this.router.navigate(["homepage"])
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //loginByEmailService

  loginByEmail(email:string){
    this.authService.loginByEmailService(email).subscribe({
      next: (res) => {
        // alert("Login Successful!")
        // console.log(res);
        // this.router.navigate(["homepage"])
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

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
