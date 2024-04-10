import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-leave-requests',
  standalone: true,
  imports: [HeaderMergedComponent, CommonModule, HttpClientModule],
  templateUrl: './all-leave-requests.component.html',
  styleUrl: './all-leave-requests.component.css',
  providers: [AdminService]
})
export class AllLeaveRequestsComponent implements OnInit {

  adminService = inject(AdminService);
  router = inject(Router);

  role: any;
  
  selectedRole: string = 'Student'; // Default role is 'student'
  studentLeaveRequestsList:any;
  teacherLeaveRequestsList: any;


  // fun() {
  //   console.log(this.studentLeaveRequests);
  //   console.log(this.teacherLeaveRequests);
  // }

  // studentLeaveRequests: string[] = [
  //   'Shubham Sargar is requesting leave as a student from TY Computer for the 6th semester, from 13/6/24 to 25/6/24.',
  //   'suraj upadhye is requesting leave as a student from TY Computer for the 6th semester, from 13/6/24 to 25/6/24.',
  //   // Add more student leave requests here
  // ];
  // teacherLeaveRequests: string[] = [
  //   'Pravin Rupnar is requesting leave as a teacher from 13/6/24 to 25/6/24.',
  //   // Add more teacher leave requests here
  // ];

  ngOnInit(): void {
    this.role = localStorage.getItem('role');

    if (this.role === 'Teacher') {
      this.getStudentLeaveData();
    }

    if (this.selectedRole === 'Student') {
      this.getStudentLeaveData();
    }
    if (this.selectedRole === 'Teacher') {
      this.getTeacherLeaveData();
    }
  }

  getTeacherLeaveData(){
    this.adminService.getStudentTeacherLeaveService("Teacher").subscribe({
      next: (res) => {
        console.log('Successfully got teacher the data');
        console.log(res);
        this.teacherLeaveRequestsList = res.data;
        console.log(this.teacherLeaveRequestsList);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  getStudentLeaveData(){
    this.adminService.getStudentTeacherLeaveService("Student").subscribe({
      next: (res) => {
        console.log('Successfully got teacher the data');
        console.log(res);
        this.studentLeaveRequestsList = res.data;
        console.log(this.studentLeaveRequestsList);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  
  onRoleChange(role: string) {
    this.selectedRole = role;
    if (role === 'Student') {
      this.getStudentLeaveData();
    }
    if (role === 'Teacher') {
      this.getTeacherLeaveData();
    }
  }


  // onTeacherLeaveAcceptClick(_id:any){
  //   alert("Teacher id :"+ _id)
  // }

  // onTeacherLeaveRejectClick(_id:any){
  //     alert("Student id :" + _id)
  // }
  

}
