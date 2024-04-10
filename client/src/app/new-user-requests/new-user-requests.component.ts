import { Component, OnInit, inject } from '@angular/core';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../services/admin.service';
import { parseStackingContexts } from 'html2canvas/dist/types/render/stacking-context';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-user-requests',
  standalone: true,
  imports: [HeaderMergedComponent, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './new-user-requests.component.html',
  styleUrl: './new-user-requests.component.css',
  providers: [AdminService],
})
export class NewUserRequestsComponent implements OnInit {
  // getNewStudentList
  adminService = inject(AdminService);
  studentList: any;
  teacherList: any;
  selectedRole: string = 'Student'; // Default role is 'student'

  getStudentListData() {
    this.adminService.getNewStudentListService().subscribe({
      next: (res) => {
        console.log('Successfully got student the data');
        console.log(res);
        this.studentList = res.data;
        console.log(this.studentList);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  getTeacherListData() {
    this.adminService.getNewTeacherListService().subscribe({
      next: (res) => {
        console.log('Successfully got teacher the data');
        console.log(res);
        this.teacherList = res.data;
        console.log(this.teacherList);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  role: any;

  fun() {
    console.log(this.teachers);
    console.log(this.students);
  }

  students: any[] = [];
  teachers: any[] = [];
  ngOnInit(): void {
    this.role = localStorage.getItem('role');

    if (this.role === 'Teacher') {
      this.getStudentListData();
    }

    if (this.selectedRole === 'Student') {
      this.getStudentListData();
    }
    if (this.selectedRole === 'Teacher') {
      this.getTeacherListData();
    }
  }

  constructor() {}

  onRoleChange(role: string) {
    this.selectedRole = role;
    if (role === 'Student') {
      this.getStudentListData();
    }
    if (role === 'Teacher') {
      this.getTeacherListData();
    }
  }


  teacherViewProfileClick(_id:any){
    alert("Teacher id :"+ _id)
  }

  studentViewProfileClick(_id:any){
      alert("Student id :" + _id)
  }


}
