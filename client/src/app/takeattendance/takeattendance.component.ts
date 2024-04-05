import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-takeattendance',
  standalone: true,
  templateUrl: './takeattendance.component.html',
  styleUrl: './takeattendance.component.css',
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    HeaderMergedComponent,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [AdminService],
})
export class TakeattendanceComponent implements OnInit {
  adminService = inject(AdminService);

  subjectSwitchOptionList: any;
  subjectSwitchOptionListFormatted: any;

  role: any = '';

  date: any = this.getCurrentDate();
  year: String = '';
  semester: String = '';
  branch: String = '';
  division: String = '';
  sessionTypeList: any = '';
  batchList: any = '';
  subjectName: String = '';

  getSubjectSwitchOptionListFormatted() {
    // Check if subjectSwitchOptionList exists and has data
    if (
      this.subjectSwitchOptionList &&
      this.subjectSwitchOptionList.data &&
      this.subjectSwitchOptionList.data.length > 0
    ) {
      // Create an array to store the transformed data
      const transformedData = [];

      // Iterate over each item in the data array
      for (const item of this.subjectSwitchOptionList.data) {
        // Prepare an object with all the properties from the current item
        const dataItem = {
          year: item.year,
          semester: item.semester,
          branch: item.branch,
          division: item.division,
          sessionTypeList: item.sessionType,
          batch: item.batch,
          subjectName: item.subject
        };

        // Push the prepared object into the transformedData array
        transformedData.push(dataItem);
      }

      // Return the array of objects containing all the transformed data
      console.log(transformedData);

      return transformedData;
    } else {
      // If subjectSwitchOptionList is not properly initialized or has no data, return null or handle the error accordingly
      console.log(null);
      return null;
    }
  }

  currentIndex = 0; // Initialize the current index to 0
  switchData(): void {
    // Increment the current index
    this.currentIndex++;

    // If the current index exceeds the length of the data array, reset it to 0
    if (this.currentIndex >= this.subjectSwitchOptionListFormatted.length) {
      this.currentIndex = 0;
    }
    // Update the displayed data based on the current index
    this.updateDisplayedData();
  }

  updateDisplayedData(): void {
    this.year = this.subjectSwitchOptionListFormatted[this.currentIndex].year;
    this.semester = this.subjectSwitchOptionListFormatted[this.currentIndex].semester;
    this.branch = this.subjectSwitchOptionListFormatted[this.currentIndex].branch;
    this.division = this.subjectSwitchOptionListFormatted[this.currentIndex].division;
    this.sessionTypeList = this.subjectSwitchOptionListFormatted[this.currentIndex].sessionType;
    this.batchList = this.subjectSwitchOptionListFormatted[this.currentIndex].batch;
    this.subjectName = this.subjectSwitchOptionListFormatted[this.currentIndex].subjectName;
  }

  getCurrentDate(): string {
    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    let month: string | number = currentDate.getMonth() + 1;
    let day: string | number = currentDate.getDate();

    // Pad single digits with leading zero
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    // Formatted date string in the format "yyyy-MM-dd"
    const formattedDate: string = `${year}-${month}-${day}`;

    return formattedDate;
  }

  getSubjectData() {
    this.adminService.getSubjectSwitchOptionListService().subscribe({
      next: (res) => {
        // this.subjectSwitchOptionList = res;
        this.subjectSwitchOptionList = { ...res };
        // console.log("also inside",this.subjectSwitchOptionList);

        console.log('inside func:', res);
        this.subjectSwitchOptionListFormatted =
          this.getSubjectSwitchOptionListFormatted();
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.getSubjectData();
  }

  users = [
    { roll: '233205', name: 'suraj jitendra borgave', attence: 'Present' },
    { roll: '233206', name: 'shubham dhondiram sargar', attence: 'Present' },
    { roll: '233207', name: 'manas chandrashekahar patil', attence: 'Present' },
    { roll: '233208', name: 'suraj shantinath upadhye', attence: 'Present' },
    { roll: '233209', name: 'atharv anil niprul', attence: 'Present' },
  ];

  onfun() {
    console.log(this.users);
  }

  changeColor(index: number) {
    const user = this.users[index];
    switch (user.attence) {
      case 'Present':
        user.attence = 'Absent';
        break;
      case 'Absent':
        user.attence = 'Leave';
        break;
      case 'Leave':
        user.attence = 'Present';
        break;
    }
  }
}
