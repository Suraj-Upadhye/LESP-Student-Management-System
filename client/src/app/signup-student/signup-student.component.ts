import { CommonModule } from '@angular/common';
import { Component, OnInit, inject} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './signup-student.component.html',
  styleUrl: './signup-student.component.css'
})
export class SignupStudentComponent implements OnInit{

  fb = inject(FormBuilder);

  signupForm!: FormGroup;
imageUrl: any;


  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      middleName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(27)]],
      pincode: ['', [Validators.required, Validators.pattern('^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$')]],
      year: ['', Validators.required],
      semester: ['', Validators.required],
      branch: ['', Validators.required],
      division: ['', Validators.required],
      enrollmentNo: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      rollNo: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      studentMobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      fatherMobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      motherMobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      Email: ['', [Validators.required, Validators.email]],
      Otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
  }

  // Function to access form controls easily in the HTML template
  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
  }


//   isFormSubmited: boolean=false;
//   password:string='';
//   repassword:string='';
//   userObj: any={
//     firstName:'',
//     middleName:'',
//     lastName:'',
//     gender: '',
//     address:'',
//     pincode:'',
//     year: '',
//     semester: '',
//     branch: '',
//     division: '',
//     enrollmentNo:'',
//     rollNo:'',
//     studentMobileNumber:'',
//     fatherMobileNumber:'',
//     motherMobileNumber:'',
//     Email:'',
//     Otp:'',
//     password:'',
//     repassword:'',
//   }


//   users= [
    

//   ]
//   onSubmit(){
//     this.isFormSubmited=true;
//     if(this.password !== this.repassword){
//       console.log("password Does Not Match:")
//       return;
//     }
//     else{
//       this.password='';
//       this.repassword='';
//       console.log("password are same")
//     }
//   }
   


//   imageUrl: string | ArrayBuffer | null = null;

//   constructor() { }

//   handleFileInput(event: any): void {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//       this.imageUrl = reader.result;
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   }

handleFileInput(event: any):void{
  
}

//   handleUploadClick(): void {
//     const uploadInput = document.getElementById('upload');
//     uploadInput?.click();
//   }

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