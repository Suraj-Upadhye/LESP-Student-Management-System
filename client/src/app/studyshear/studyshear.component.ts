import { Component, OnInit, inject } from '@angular/core';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../services/admin.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studyshear',
  standalone: true,
  templateUrl: './studyshear.component.html',
  styleUrl: './studyshear.component.css',
  imports: [
    HeaderMergedComponent,
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers: [AdminService],
})
export class StudyshearComponent implements OnInit {
  subjectList: any;
  subjectSelected: any;
  images: any;
  fileSelected = false;
  resourceFile: any;
  files: any;

  isFormSubmited: boolean = false;

  userObj = {
    description: '',
  };

  adminService = inject(AdminService);
  router = inject(Router);

  getSubjectListByCurrentAdmin() {
    this.adminService.getSubjectListByCurrentAdminService().subscribe({
      next: (res) => {
        console.log(res);
        this.subjectList = res.subjects;
        //   alert(res.message);
        // this.router.navigate(['homepage-teacher-hod']);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
        // this.router.navigate(['homepage-teacher-hod']);
      },
    });
  }

  ngOnInit(): void {
    this.getSubjectListByCurrentAdmin();
  }

  selectedSubject(subjectSelected: string) {
    this.subjectSelected = subjectSelected;
    // console.log(this.subjectSelected);
  }

  imageUrl: string | ArrayBuffer | null = null;

  handleFileInput(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // Check if the file is an image
        this.fileSelected = true;
        this.images = file;
    }
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result;
      // console.log(this.imageUrl);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  
  onUpload() {
    if (!this.images) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('resourceFile', this.images);
    formData.append('description', this.userObj.description);
    console.log(formData); // Check FormData before sending
    console.log(this.resourceFile); // Check resourceFile
    console.log(this.userObj.description);
    console.log(this.subjectSelected);
    
    
    // Call the function to send formData
    // this.sendResource(formData);
  }
  

  sendResource(formData: FormData): void {
    this.adminService.addSharedResource(formData).subscribe({
      next: (res) => {
        console.log(res);
        alert('Resource Sent Successfully');
        // this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message + 'Failed to send resource');
      },
    });
  }
}
