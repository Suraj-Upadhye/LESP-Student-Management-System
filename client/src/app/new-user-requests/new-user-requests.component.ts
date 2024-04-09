import { Component, OnInit } from '@angular/core';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-user-requests',
  standalone: true,
  imports: [HeaderMergedComponent,CommonModule],
  templateUrl: './new-user-requests.component.html',
  styleUrl: './new-user-requests.component.css'
})
export class NewUserRequestsComponent implements OnInit{


  role: any;

  fun(){
    
    console.log(this.teachers)
    console.log(this.students)

  }

  students: any[] = [];
  teachers: any[] = [];
  ngOnInit(): void {
    // Logic to fetch student and teacher data
    this.students = [
      {  name: 'Student 1', batch: 'TY', sem: '6th' },
      // {  name: 'Student 2', batch: 'SY', sem: '5th' },
      // Other student data
    ];

    this.teachers = [
      { name: 'Teacher 1' },
      {  name: 'Teacher 2' },
      // Other teacher data
    ];
    this.role = localStorage.getItem('role')
  }
  
  selectedRole: string = 'student'; // Default role is 'student'

  constructor() {}

  // Method to handle role changes
  onRoleChange(role: string) {
    this.selectedRole = role;
  }


}
