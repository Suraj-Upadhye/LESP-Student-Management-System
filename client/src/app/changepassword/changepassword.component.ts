import { Component } from '@angular/core';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-changepassword',
    standalone: true,
    templateUrl: './changepassword.component.html',
    styleUrl: './changepassword.component.css',
    imports: [HeaderMergedComponent,CommonModule,FormsModule]
})
export class ChangepasswordComponent {
    newPassword: string = ''; // newPassword variable is initialize
    confirmPassword: string = ''; // confirmpassword variable is initialize
    passwordMatchError: boolean = false; // Variable to track password match error
  
    onSubmit() {
      // Check the newPassword and confirmPassword match
      if (this.newPassword !== this.confirmPassword) {
        // If passwords do not match
        // set passwordMatchError to true
        this.passwordMatchError = true;
        return; // return the function
      }
  
      // its passwords match, continue with form submission and further logic
      console.log('New Password:', this.newPassword);
      console.log('Confirm Password:', this.confirmPassword);
  
      // Reset password  error
      this.passwordMatchError = false;
    }
  

}
