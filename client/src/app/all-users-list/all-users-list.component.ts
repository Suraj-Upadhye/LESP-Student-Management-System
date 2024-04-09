import { Component, OnInit } from '@angular/core';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-users-list',
  standalone: true,
  imports: [HeaderMergedComponent, CommonModule, RouterModule],
  templateUrl: './all-users-list.component.html',
  styleUrl: './all-users-list.component.css'
})
export class AllUsersListComponent implements OnInit{

  role: any;
  
  fun(){
    console.log(this.students);
    
  }

  students: any[] = [
    { rollNo: '233206', name: 'Manas Chnadrashekhar patil' },
    { rollNo: '233207', name: 'shubham Dhondiram Sargar' },
    // Add more student data here
  ];
  teachers: any[] = [
    { srNo: '01', name: 'Mr. Pravin Maruti Rupnar' },
    { srNo: '02', name: 'Mr. Suraj shantinath Upadhye' },
    // Add more teacher data here
  ];

    selectedRole: string = 'student'; // Default role is 'student'


  // Method to handle role changes
  onRoleChange(role: string) {
    this.selectedRole = role;
  }
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
  }


  
}
