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
  selector: 'app-signupteacher',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    JsonPipe,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './signupteacher.component.html',
  styleUrl: './signupteacher.component.css',
  providers: [AuthService, AdminService],
})
export class SignupteacherComponent {
  authService = inject(AuthService);
  adminService = inject(AdminService);
  router = inject(Router);

  otpVerified: boolean = false;
  images: any;
  fileSelected = false;

  subjectdata: any;

  isFormSubmited: boolean = false;
  password: string = '';
  repassword: string = '';

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
    otp: '',
    password: '12345',
    role: 'Teacher',
  };

  onSubmit() {
    this.isFormSubmited = true;
    this.userObj.workingDetails = this.fieldData;
    // console.log(this.fieldData);
    // console.log(this.userObj);
    // console.log(this.userObj.workingDetails);
    // console.log(this.userObj);

    if (this.password !== this.repassword) {
      console.log('password Does Not Match:');
      return;
    } else {
      const formData = new FormData();
      formData.append('profilePhoto', this.images);

      Object.entries(this.userObj).forEach(([key, value]) => {
        if (key === 'workingDetails') {
          // Convert the array to JSON string and append it to formData
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          formData.append(key, String(value));
        }
      });
      if (this.otpVerified) {
        this.registerAdmin(formData);
      } else {
        alert('Please Verify Your Email First');
        const email = document.getElementById('email') as HTMLInputElement;
        email.focus();
      }
    }
  }

  registerAdmin(formData: FormData) {
    console.log('FormData contents:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.adminService.registerAdminService(formData).subscribe({
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
    const selectedSubjectData = this.subjectdata.find(
      (subject: { subjectName: string }) =>
        subject.subjectName === this.selectedSubject
    );
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
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // Check if the file is an image
      if (file.type.startsWith('image/')) {
        // It's an image file
        this.fileSelected = true;
        this.images = file;
      } else {
        // It's not an image file
        this.fileSelected = false;
        console.error('Selected file is not an image.');
        alert('Please select a valid Image File!');
        // Optionally, you can reset the selected file to null
        this.images = null;
      }
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

  // handleUploadClick(): void {
  //   const uploadInput = document.getElementById('upload');
  //   uploadInput?.click();
  // }
}
