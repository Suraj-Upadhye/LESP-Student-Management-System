import { Component,ElementRef,Renderer2,ViewChild } from '@angular/core';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-newstudent-requsetpage',
    standalone: true,
    templateUrl: './newstudent-requsetpage.component.html',
    styleUrl: './newstudent-requsetpage.component.css',
    imports: [HeaderMergedComponent,CommonModule]
})
export class NewstudentRequsetpageComponent {


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
  }
  
  selectedRole: string = 'student'; // Default role is 'student'

  constructor() {}

  // Method to handle role changes
  onRoleChange(role: string) {
    this.selectedRole = role;
  }
}

