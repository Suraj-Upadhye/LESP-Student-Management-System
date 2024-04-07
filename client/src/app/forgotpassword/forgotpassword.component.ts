import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
  imports: [CommonModule, FormsModule, JsonPipe, HttpClientModule],
  providers: [AuthService],
})
export class ForgotpasswordComponent {
  authService = inject(AuthService);

  isFormSubmited: boolean = false;

  userObj: any = {
    email: '',
  };
  onSubmit() {
    this.isFormSubmited = true;
    // console.log(this.userObj.email);
    this.forgetPassword();
  }

  forgetPassword() {
    this.authService.forgetPasswordService(this.userObj).subscribe({
      next: (res) => {
        alert('Reset Email Sent Successfully!');
        console.log(res);
        this.userObj.email = '';
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }
}
