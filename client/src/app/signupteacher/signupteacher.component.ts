import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signupteacher',
  standalone: true,
  imports: [FormsModule,CommonModule,JsonPipe],
  templateUrl: './signupteacher.component.html',
  styleUrl: './signupteacher.component.css'
})
export class SignupteacherComponent {

  isFormSubmited: boolean=false; 

  fieldData: any[] = [{
    year: 'NONE',
    semester: 'NONE',
    branch: 'NONE',
    division: 'NONE',
    sessionType: 'NONE',
    batch: 'NONE',
    subject: 'NONE'
  }];
  //data represent Item
  //fielddata during iteration


  // Method to add a new set of fields
  addFields() {
    // Push a new set of fields to the array
    this.fieldData.push({
      year: 'NONE',
      semester: 'NONE',
      branch: 'NONE',
      division: 'NONE',
      sessionType: 'NONE',
      batch: 'NONE',
      subject: 'NONE'
    });
  }

  removeFields(index: number) {
    this.fieldData.splice(index, 1); // Removes the fields at the specified index
  }

  //validation
  userObj: any={
    firstname:'',
    middlename:'',
    lastname:'',
    address:'',
    pincode:'',
    Qualification:'',
    Teaching:'',
    mobileno:'',
    Email:'',
    Otp:'',
    password:'',
    repassword:'',
  }

  onSubmit(){
    this.isFormSubmited=true;
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
