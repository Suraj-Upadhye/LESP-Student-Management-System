import { Component, inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-leave-application',
  standalone: true,
  templateUrl: './teacher-leave-application.component.html',
  styleUrl: './teacher-leave-application.component.css',
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    HeaderMergedComponent,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AdminService],
})
export class TeacherLeaveApplicationComponent {
  startDate: String = '';
  endDate: String = '';
  reason: String = '';
  adminService = inject(AdminService);
  router = inject(Router);

  onSubmit() {
    console.log("hello");
    
    this.adminService
      .addLeaveApplicationStudentTeacherService(
        this.startDate,
        this.endDate,
        this.reason
      )
      .subscribe({
        next: (res) => {
          alert(
            'Your Leave request has been submitted successfully. We will notify you by  email once the application is processed.'
          );
          console.log(res);
          if (localStorage.getItem('role') === 'Student') {
            this.router.navigate(['homepage-student']);
          } else if (localStorage.getItem('role') === 'Teacher') {
            this.router.navigate(['homepage-teacher-hod']);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
