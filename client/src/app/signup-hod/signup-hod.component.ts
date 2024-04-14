import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../services/admin.service';

interface SubjectData {
  subject: string;
  mode: string[][];
  applicableBatchNames: string[];
}

interface ExtractedSubject {
  subjectName: string;
  sessionTypes: string[];
  batches: string[];
}

@Component({
  selector: 'app-signup-hod',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    JsonPipe,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './signup-hod.component.html',
  styleUrl: './signup-hod.component.css',
  providers: [AuthService, AdminService],
})
export class SignupHodComponent {
  authService = inject(AuthService);
  adminService = inject(AdminService);
  router = inject(Router);

  otpVerified: boolean = false;

  subjectdata: any;

  isFormSubmited: boolean = false;

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

  // Method to add a new set of fields
  addFields() {
    // Push a new set of fields to the array
    this.fieldData.push({
      year: '',
      semester: '',
      branch: '',
      division: '',
      sessionType: '',
      batch: '',
      subject: '',
    });
  }

  removeFields(index: number) {
    if (this.fieldData.length > 1) {
      this.fieldData.splice(index, 1);
    }
  }

  //validation
  userObj: any = {
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    address: '',
    pincode: '',
    mobileNumber: '',
    qualification: '',
    teachingExperience: 0,
    department: '',
    email: '',
    otp: '',
    password: '',
    role: ''
  };

  onSubmit() {
    this.isFormSubmited = true;
    console.log(this.fieldData);
    console.log(this.userObj);
    this.userObj.workingDetails = this.fieldData;
    console.log(this.userObj.workingDetails);
    this.registerAdmin();
  }

  registerAdmin() {
    this.adminService.registerAdminService(this.userObj).subscribe({
      next: (res) => {
        console.log(res);
        alert(
          'Your Registration request sent Successfully! Please wait for HOD approval. We will notify you by Email'
        );
        this.router.navigate(['login']);
        // this.userObj.email = '';
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  sendOTP(): any {
    const email = this.userObj.email;
    // var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    var pattern =
      /(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[$@$!%?&])[A-Za-z\d$@$!%?&].{8,}/;

    if (email === '') {
      alert('Please enter valid email id');
      return false;
    } else {
      this.createAndStoreOTP();
    }
  }

  createAndStoreOTP() {
    this.authService.createAndStoreOTPService(this.userObj.email).subscribe({
      next: (res) => {
        alert('OTP is Sent Successfully!');
        console.log(res);
        // this.userObj.email = '';
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  verifyOTP() {
    this.authService
      .verifyOTPService(this.userObj.email, this.userObj.otp)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert('OTP Verified Successfully');
          this.otpVerified = true;
          // this.userObj.email = '';
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
        },
      });
  }

  extractSubjects(data: SubjectData[]): ExtractedSubject[] {
    const subjectsArray: ExtractedSubject[] = [];
  
    data.forEach((subject: SubjectData) => {
      const { subject: subjectName, mode, applicableBatchNames } = subject;
  
      // Create an object for each subject containing its name, session types, and batches
      const subjectObject: ExtractedSubject = {
        subjectName,
        sessionTypes: mode.flat(),
        batches: applicableBatchNames,
      };
  
      // Push the subject object to the subjects array
      subjectsArray.push(subjectObject);
      this.subjectdata = subjectsArray;
    });
  
    return subjectsArray;
  }
  


  // subjectdata: any[] = []; // Assuming this contains the subject data returned from the function
  selectedSubject: string = '';
  selectedSessionType: string[] = [];
  selectedBatch: string[] = [];
  sessionTypes: string[] = [];
  batches: string[] = [];

  onSubjectChange() {
    const selectedSubjectData = this.subjectdata.find((subject: { subjectName: string; }) => subject.subjectName === this.selectedSubject);
    if (selectedSubjectData) {
      this.sessionTypes = selectedSubjectData.sessionTypes;
      this.batches = selectedSubjectData.batches;
      this.fieldData[0].sessionType = selectedSubjectData.sessionTypes;
      this.fieldData[0].subject = selectedSubjectData.subjectName;
    } else {
      this.sessionTypes = [];
      this.batches = [];
    }
  }
  

  subjectData() {
    // this.isFormSubmited = true;
    // console.log(this.userObj.year);

    this.adminService
      .getSubjectListByYSBService(
        this.fieldData[0].year,
        this.fieldData[0].semester,
        this.fieldData[0].branch
      )
      .subscribe({
        next: (res) => {
          // this.subjectSwitchOptionList = res;
          // Assuming 'res' contains the received data
          const subjectsData: SubjectData[] = res.data;
          const extractedSubjects: ExtractedSubject[] =
            this.extractSubjects(subjectsData);
          console.log(extractedSubjects);

          // console.log('inside func:', res);
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
        },
      });
  }

  //image Set
  imageUrl: string | ArrayBuffer | null = null;

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleUploadClick(): void {
    const uploadInput = document.getElementById('upload');
    uploadInput?.click();
  }
}
