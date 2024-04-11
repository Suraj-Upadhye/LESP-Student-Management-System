import { Component, OnInit, inject } from '@angular/core';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../services/admin.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-viewprofileteacher',
  standalone: true,
  templateUrl: './viewprofileteacher.component.html',
  styleUrl: './viewprofileteacher.component.css',
  imports: [
    HeaderMergedComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [AdminService],
})
export class ViewprofileteacherComponent implements OnInit {
  adminService = inject(AdminService);
  router = inject(Router);
  isClassTeacher: boolean= false;

  teacherData: any;

  role: string = '';

  fieldData: any[] = [
    {
      year: '',
      semester: '',
      branch: '',
      division: '',
      sessionType: '',
      batch: '',
      subject: '',
    },
  ];

  //validation
  userObj: any = {
    firstName: 'Premala',
    middleName: 'Bhushan',
    lastName: 'Khot',
    gender: 'Female',
    address: 'kannanwadi latthe collage javal',
    pincode: '416410',
    mobileNumber: '1234567890',
    qualification: 'B.tech',
    teachingExperience: 2,
    department: '',
    email: 'premelabkhot@gmail.com',
    password: '12345',
  };

  getViewTeacherProfileData() {
    let teacher_id: any;
    if (
      localStorage.getItem('view_teacher_profile_id') &&
      localStorage.getItem('role') === 'HOD'
    ) {
      this.role = 'HOD';
      teacher_id = localStorage.getItem('view_teacher_profile_id');
      console.log(teacher_id);
    } else if (localStorage.getItem('role') === 'Teacher') {
      this.role = 'Teacher';
      teacher_id = localStorage.getItem('_id');
      console.log(teacher_id);
    }

    this.adminService.getViewTeacherProfileService(teacher_id).subscribe({
      next: (res) => {
        console.log('Successfully got Teacher profile data');
        console.log(res);
        this.teacherData = res;
        console.log(this.teacherData);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  ngOnInit(): void {
    this.getViewTeacherProfileData();
  }
}
