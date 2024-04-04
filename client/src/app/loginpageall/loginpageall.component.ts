import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loginpageall',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './loginpageall.component.html',
  styleUrl: './loginpageall.component.css'
})
export class LoginpageallComponent {
  email: string = ''; // Initialize email variable
  password: string = ''; // Initialize password variable

  onSubmit() {
    // Log the email and password values to the console
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Here you can add further logic, like sending the data to a backend server
  }

}
