import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-page-for-all',
  standalone: true,
  imports: [RouterModule, RouterModule, HttpClientModule],
  templateUrl: './login-page-for-all.component.html',
  styleUrl: './login-page-for-all.component.css',
  providers: [AuthService]
})
export class LoginPageForAllComponent implements OnInit {
  profileName: any = 'Profile Name';

  authService = inject(AuthService);
  router = inject(Router)

  ngOnInit(): void {
    try {
      this.profileName = localStorage.getItem('user_name');
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
