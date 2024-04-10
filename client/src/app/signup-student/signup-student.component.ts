import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { first } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup-student',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './signup-student.component.html',
  styleUrl: './signup-student.component.css',
  providers: [AuthService],
})
export class SignupStudentComponent {
  authService = inject(AuthService);
  router = inject(Router);

  otpVerified: boolean = false;
  images: any;
  fileSelected = false;

  isFormSubmited: boolean = false;
  password: string = '';
  repassword: string = '';
  userObj: any = {
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    address: '',
    pincode: '',
    year: '',
    branch: '',
    division: '',
    enrollmentNo: '',
    rollNo: '',
    semester: '',
    studentMobileNumber: '',
    fatherMobileNumber: '',
    motherMobileNumber: '',
    email: '',
    otp: '',
    password: '',
    role: 'student',
  };

  fyn() {
    console.log(this.userObj);
  }

  onSubmit() {
    console.log(this.userObj);
    this.isFormSubmited = true;
    if (this.password !== this.repassword) {
      console.log('password Does Not Match:');
      return;
    } else {
      const formData = new FormData();
      formData.append('profilePhoto', this.images);

      // Add other user information to formData
      Object.entries(this.userObj).forEach(([key, value]) => {
        // Check if the value is a File (profile photo) or a string
        if (value instanceof File) {
          formData.append(key, value, value.name); // Cast value to Blob and include filename
        } else {
          formData.append(key, String(value)); // Cast value to string
        }
      });
      if (this.otpVerified) {
        this.registerUser(formData);
      } else {
        alert('Please Verify Your Email First');
        const email = document.getElementById('email') as HTMLInputElement;
        email.focus();
      }
      // this.password='';
      // this.repassword='';
      // console.log("password are same")
    }
  }

  registerUser(formData: FormData) {
    this.authService.registerUserService(formData).subscribe({
      next: (res) => {
        console.log(res);
        alert(
          'Your Registration request sent Successfully! Please wait for Class Teacher approval. We will notify you by Email'
        );
        this.router.navigate(['login']);
        // this.userObj.email = '';
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message + "The User already exists with this credientials");
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

  imageUrl: string | ArrayBuffer | null = null;

  constructor() {}

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

//validation
// This line defines an input field of type "text" with the name attribute set to "address".
// #address="ngModel" creates a local template variable named "address" and assigns it the reference of the NgModel directive associated with this input field.
// [(ngModel)]="userObj.address" establishes two-way data binding between the input field and the "address" property of the "userObj" object in the component.
// minlength="27" specifies that the minimum length of the input value should be 27 characters.
// class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150":

// This line sets various CSS classes to style the input field.
// placeholder="latthe Education Society's Polytechnic":

// This sets the placeholder text for the input field.
// required:

// This attribute specifies that the input field is required and must be filled out before submitting the form.
// <div class="text-red-500" *ngIf="address.invalid && (address.touched || address.dirty || isFormSubmited)">:

// This div displays error messages if the input field is invalid and has been touched by the user, or if the form has been submitted (isFormSubmited is assumed to be a variable in the component representing whether the form has been submitted or not).
// <span *ngIf="address.errors?.['required']">Address is required</span>:

// This line displays an error message if the input field is required but empty.
// <span *ngIf="address.errors?.['minlength']">Address must be at least 27 characters long</span>:

// This line displays an error message if the input value is shorter than the specified minimum length (27 characters in this case).
