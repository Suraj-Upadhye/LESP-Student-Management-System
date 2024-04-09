import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page-for-all',
  standalone: true,
  imports: [RouterModule, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './login-page-for-all.component.html',
  styleUrl: './login-page-for-all.component.css',
  providers: [AuthService]
})
export class LoginPageForAllComponent implements OnInit {
  profileName: any = 'Profile Name';
  profilePhotoURL: any = "";
  role: any ="";

  authService = inject(AuthService);
  router = inject(Router)

  ngOnInit(): void {
    try {
      this.profileName = localStorage.getItem('user_name');
      this.profilePhotoURL = localStorage.getItem('profilePhotoURL');
      this.role=localStorage.getItem("role");
    } catch (error) {
      console.log(error);
    }
  }

  logout(){
    this.authService.logoutService().subscribe({
      next: (res) => {
        // localStorage.removeItem('accessToken');
        localStorage.clear();
        alert('Logouted out successfully!');
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

}
