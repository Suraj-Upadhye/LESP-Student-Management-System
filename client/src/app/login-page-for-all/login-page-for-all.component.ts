import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page-for-all',
  standalone: true,
  imports: [RouterModule, RouterModule],
  templateUrl: './login-page-for-all.component.html',
  styleUrl: './login-page-for-all.component.css',
})
export class LoginPageForAllComponent implements OnInit {
  profileName: any = 'Profile Name';

  ngOnInit(): void {
    try {
      this.profileName = localStorage.getItem('user_name');
    } catch (error) {
      console.log(error);
    }
  }
}
