import { Component, inject } from '@angular/core';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-changepassword',
    standalone: true,
    templateUrl: './changepassword.component.html',
    styleUrl: './changepassword.component.css',
    imports: [HeaderMergedComponent,CommonModule,FormsModule, RouterModule, HeaderMergedComponent],
    providers:[AuthService]
})
export class ChangepasswordComponent {
  authService = inject(AuthService);
  router = inject(Router)

    newPassword: string = ''; // newPassword variable is initialize
    confirmPassword: string = ''; // confirmpassword variable is initialize
    passwordMatchError: boolean = false; // Variable to track password match error
    oldPassword: string = ''; //old Password variable is initialize
  
    onSubmit() {
      // Check the newPassword and confirmPassword match
      if (this.newPassword !== this.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      else{
        this.changePassword()
        
      // this.newPassword = '';
      // this.confirmPassword = '';
    }
  }
  
    changePassword(){
      // changeCurrentPasswordService
      this.authService.changeCurrentPasswordService(this.oldPassword, this.newPassword).subscribe({
        next: (res) => {
          alert('Password changed successfully!');
          if (localStorage.getItem("role") == 'Teacher') {
            this.router.navigate(['homepage-teacher-hod']);
          } else if (localStorage.getItem("role") == 'HOD') {
            this.router.navigate(['homepage-teacher-hod']);
          } else if (localStorage.getItem("role") == 'Student') {
            this.router.navigate(['homepage-student']);
          }
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
        },
      });
    }
}
