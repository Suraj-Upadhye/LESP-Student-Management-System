import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() username="hod";

  teacherSection=["New All Requests"," All Leave Requests","All List"];

  teacherSectionPath=["/newstudent","/listrequest","/allStudentlist"];

  // studentSection=["New Student Requests","All Students List"];

  // studentSectionPath=["/newstudent","/viewleavestudent","/allStudentlist"];


  //teacher navbar
  teachernavList=["Send Leave Application","New Student Requests","Student Leave Requests","All Students List"];

  teachernavListPath=["/leaveapplication"]

  //student navbar
  studentnavList=["Send Leave Application","Class Ranking"];

  studentnavListPath=["/leaveapplication","/class-ranking"]

  openNav(): void {
    document.getElementById('mySidenav')!.style.width = '250px';
  }

  closeNav(): void {
    document.getElementById('mySidenav')!.style.width = '0px';
  }


}
