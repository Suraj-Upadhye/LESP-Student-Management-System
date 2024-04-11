import { Component, OnInit, inject } from '@angular/core';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-all-users-list',
  standalone: true,
  imports: [HeaderMergedComponent, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './all-users-list.component.html',
  styleUrl: './all-users-list.component.css',
  providers: [AdminService]
})
export class AllUsersListComponent implements OnInit{

  adminService = inject(AdminService);
  router = inject(Router);

  role: any;
  selectedRole: string = 'Student'; // Default role is 'student'
  // selectedYear: string = "FY";
  studentList: any;
  teacherList: any;

  
  // fun(){
  //   console.log(this.students);
    
  // }

  // students: any[] = [
  //   { rollNo: '233206', name: 'Manas Chnadrashekhar patil' },
  //   { rollNo: '233207', name: 'shubham Dhondiram Sargar' },
  //   // Add more student data here
  // ];
  // teachers: any[] = [
  //   { srNo: '01', name: 'Mr. Pravin Maruti Rupnar' },
  //   { srNo: '02', name: 'Mr. Suraj shantinath Upadhye' },
  //   // Add more teacher data here
  // ];


  ngOnInit(): void {
    this.role = localStorage.getItem('role');

    if (this.role === 'Teacher') {
      this.getAllStudentListData();
    }

    if (this.selectedRole === 'Student') {
      this.getAllStudentListData();
    }
    if (this.selectedRole === 'Teacher') {
      this.getAllTeacherListData();
    }
  }

  // getAllStudentListService
  // getAllTeacherListService

  getAllStudentListData(){
    this.adminService.getAllStudentListService().subscribe({
      next: (res) => {
        console.log('Successfully got All Student data');
        console.log(res);
        this.studentList = res;
        console.log(this.studentList);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  getAllTeacherListData(){
    this.adminService.getAllTeacherListService().subscribe({
      next: (res) => {
        console.log('Successfully got All Teacher data');
        console.log(res);
        this.teacherList = res;
        console.log(this.teacherList);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  // Method to handle role changes
  onRoleChange(role: string) {
    this.selectedRole = role;
    if (role === 'Student') {
      this.getAllStudentListData();
    }
    if (role === 'Teacher') {
      this.getAllTeacherListData();
    }
  }


  teacherViewProfileClick(_id:any){
    localStorage.setItem("view_teacher_profile_id", _id);
    this.router.navigate(["/viewprofileteacher"])
    // this.router.navigate(['/pages/users/user-details', _id]);
    alert("Teacher id :"+ _id)
  }

  studentViewProfileClick(_id:any){
    localStorage.setItem("view_student_profile_id", _id);
    this.router.navigate(["/viewprofilestudent"])
      alert("Student id :" + _id)
  }

  teacherRemoveClick(_id:any){
    alert("Teacher id :"+ _id)
  }

  studentRemoveClick(_id:any){
      alert("Student id :" + _id)
  }

  closePrompt() {
    const checkbox = document.getElementById('Remove') as HTMLInputElement;
    checkbox.checked = false;
}

confirmRemove(teacherId: string) {
  // Display alert message
  const confirmMessage = confirm('Are you sure you want to remove this teacher?');
  
  // If user confirms, proceed with removal
  if (confirmMessage) {
      // Call the method to remove the teacher
      this.teacherRemoveClick(teacherId);
      
      // Close the prompt
      const checkbox = document.getElementById('Remove') as HTMLInputElement;
      checkbox.checked = false;
  }
}



  // onYearChange(year: string){
  //   this.selectedYear = year;
  //   this.getAllStudentListData();
  // }


  
}
