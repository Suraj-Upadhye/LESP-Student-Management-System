import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  providers:[AuthService]
})
export class SidebarComponent implements OnInit {
  profileName: any = 'Profile Name';
  profilePhotoURL: any = "";
  role: any = '';

  teacherSection = ['New User Requests', 'All Leave Requests', 'All Users List'];
  teacherSectionPath = ['/new-user-requests', '/all-leave-requests', '/all-users-list'];

  //teacher navbar
  teachernavList = ['Send Leave Application',];
  teachernavListPath = ['/leaveapplication'];

  //student navbar
  studentnavList = ['Send Leave Application'];
  studentnavListPath = ['/leaveapplication'];

  openNav(): void {
    document.getElementById('mySidenav')!.style.width = '250px';
  }

  closeNav(): void {
    document.getElementById('mySidenav')!.style.width = '0px';
  }


  authService = inject(AuthService);
  router = inject(Router)

  ngOnInit(): void {
    try {
      this.profileName = localStorage.getItem('user_name');
      this.profilePhotoURL = localStorage.getItem('profilePhotoURL');
      this.role = localStorage.getItem('role');
    } catch (error) {
      console.log(error);
    }
    // try {
    //   this.profileName = localStorage.getItem('user_name');
    // } catch (error) {
    //   console.log(error);
    // }
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
