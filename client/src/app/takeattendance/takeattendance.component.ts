import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

interface Student {
  _id: string;
  status: string;
}

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
  router = inject(Router);

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

  academicObj: any;
  sessionSelected: String = '';
  batchSelected: String = '';
  studentList: any;
  studentListFormatted: any = '';
  flagToDisplayTableData = false;

  attendanceData: any;
  remark: String = 'no remark';

  getstudentListFormatted() {
    if (
      this.studentList &&
      this.studentList.message &&
      this.studentList.message.length > 0
    ) {
      const transformedData = [];

      for (const item of this.studentList.message) {
        const dataItem = {
          _id: item._id,
          rollNo: item.rollNo,
          name: item.firstName + ' ' + item.middleName + ' ' + item.lastName,
          status: 'Present',
        };

        transformedData.push(dataItem);
      }
      this.flagToDisplayTableData = true;
      console.log(transformedData);
      return transformedData;
    } else {
      console.log(null);
      return null;
    }
  }

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
          sessionType: item.sessionType,
          batch: item.batch,
          subjectName: item.subject,
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
    this.semester =
      this.subjectSwitchOptionListFormatted[this.currentIndex].semester;
    this.branch =
      this.subjectSwitchOptionListFormatted[this.currentIndex].branch;
    this.division =
      this.subjectSwitchOptionListFormatted[this.currentIndex].division;
    this.sessionTypeList =
      this.subjectSwitchOptionListFormatted[this.currentIndex].sessionType;
    this.batchList =
      this.subjectSwitchOptionListFormatted[this.currentIndex].batch;
    this.subjectName =
      this.subjectSwitchOptionListFormatted[this.currentIndex].subjectName;

    const selectElement = document.getElementById(
      'selectSession'
    ) as HTMLSelectElement;
    const firstOption = selectElement.options[0];
    const firstValue = firstOption.value;
    const selectElementBatch = document.getElementById(
      'selectBatch'
    ) as HTMLSelectElement;
    // alert("here1")
    // alert(firstValue)
    if (firstValue === 'Lecture' || this.batchSelected === 'Lecture') {
      selectElementBatch.disabled = true;
    } else {
      selectElementBatch.disabled = false;
    }
    if (firstValue !== 'Lecture') {
      selectElementBatch.disabled = false;
    }
  }

  onSessionTypeChange(selectedValue: string) {
    this.sessionSelected = selectedValue;
    const selectElement = document.getElementById(
      'selectSession'
    ) as HTMLSelectElement;
    const selectElementBatch = document.getElementById(
      'selectBatch'
    ) as HTMLSelectElement;
    if (this.batchSelected !== 'Lecture') {
      selectElementBatch.disabled = false;
    } else {
      selectElementBatch.disabled = true;
    }
  }

  onBatchChange(selectedValue: string) {
    this.batchSelected = selectedValue;
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

  getStudentList() {
    this.adminService
      .getStudentsDataListForAttendanceService(this.academicObj)
      .subscribe({
        next: (res) => {
          this.studentList = { ...res };
          console.log(res);
          this.studentListFormatted = this.getstudentListFormatted();
          // console.log(this.studentList);
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
        },
      });
  }

  saveAttendanceData() {
    this.adminService.fillAttendanceService(this.attendanceData).subscribe({
      next: (res) => {
        console.log(res);
        alert(res.message);
        this.router.navigate(['homepage-teacher-hod']);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  showStudentList() {
    this.onDetailsChange();
    this.getStudentList();
  }

  changeColorAttendance(index: number) {
    const student = this.studentListFormatted[index];
    switch (student.status) {
      case 'Present':
        student.status = 'Absent';
        break;
      case 'Absent':
        student.status = 'Leave';
        break;
      case 'Leave':
        student.status = 'Present';
        break;
    }
  }

  onSaveAttendance() {
    console.log(this.studentListFormatted);
    this.createObjToSend();
  }

  onDetailsChange() {
    if (this.batchSelected === '') {
      const selectElement = document.getElementById(
        'selectBatch'
      ) as HTMLSelectElement;
      const selectedOption = selectElement.options[0];
      const selectedValue = selectedOption.value;
      this.batchSelected = selectedValue;
    }
    if (this.sessionSelected === '') {
      const selectElement = document.getElementById(
        'selectSession'
      ) as HTMLSelectElement;
      const selectedOption = selectElement.options[0];
      const selectedValue = selectedOption.value;
      this.sessionSelected = selectedValue;
    }

    this.academicObj = {
      year: this.year,
      semester: this.semester,
      branch: this.branch,
      division: this.division,
      sessionType: this.sessionSelected,
      batch: this.batchSelected,
      subjectName: this.subjectName,
    };
    console.log(this.academicObj);
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.getSubjectData();
  }

  createObjToSend() {
    this.attendanceData = {
      date: this.date, // Use the date for which the attendance is being recorded
      teacherId: localStorage.getItem('_id'), // Assign the teacher's ObjectId
      year: this.year,
      semester: this.semester,
      branch: this.branch,
      subjectName: this.subjectName,
      studentList: this.studentListFormatted.map((student: Student) => ({
        studentId: student._id,
        state: student.status,
      })),
      sessionType: this.sessionSelected, // Assign the session type (e.g., Lecture, Practical, Tutorial)
      batchBelongs: this.batchSelected, // Assign the batch to which the attendance belongs
      remark: this.remark, // Provide any remark or note
    };
    console.log(this.attendanceData);
    this.saveAttendanceData()
  }

  // users = [
  //   { roll: '233205', name: 'suraj jitendra borgave', attence: 'Present' },
  //   { roll: '233206', name: 'shubham dhondiram sargar', attence: 'Present' },
  //   { roll: '233207', name: 'manas chandrashekahar patil', attence: 'Present' },
  //   { roll: '233208', name: 'suraj shantinath upadhye', attence: 'Present' },
  //   { roll: '233209', name: 'atharv anil niprul', attence: 'Present' },
  // ];

  // onfun() {
  //   console.log(this.users);
  // }

  // changeColor(index: number) {
  //   const user = this.users[index];
  //   switch (user.attence) {
  //     case 'Present':
  //       user.attence = 'Absent';
  //       break;
  //     case 'Absent':
  //       user.attence = 'Leave';
  //       break;
  //     case 'Leave':
  //       user.attence = 'Present';
  //       break;
  //   }
  // }
}
