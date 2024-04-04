import { Component } from '@angular/core';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-list-student-request',
    standalone: true,
    templateUrl: './list-student-request.component.html',
    styleUrl: './list-student-request.component.css',
    imports: [HeaderMergedComponent,CommonModule]
})
export class ListStudentRequestComponent {


  fun(){
    console.log(this.studentLeaveRequests);
    console.log(this.teacherLeaveRequests);

    
  }

  studentLeaveRequests: string[] = [
    "Shubham Sargar is requesting leave as a student from TY Computer for the 6th semester, from 13/6/24 to 25/6/24.",
    "suraj upadhye is requesting leave as a student from TY Computer for the 6th semester, from 13/6/24 to 25/6/24.",
    // Add more student leave requests here
  ];
  teacherLeaveRequests: string[] = [
    "Pravin Rupnar is requesting leave as a teacher from 13/6/24 to 25/6/24.",
    // Add more teacher leave requests here
  ];




    selectedRole: string = 'student'; // Default role is 'student'

    constructor() {}
  
    // Method to handle role changes
    onRoleChange(role: string) {
      this.selectedRole = role;
    }

}
