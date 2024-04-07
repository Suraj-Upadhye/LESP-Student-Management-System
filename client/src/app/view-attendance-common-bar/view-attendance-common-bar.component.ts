import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';


interface Student {
  _id: string;
  status: string;
}

@Component({
  selector: 'app-view-attendance-common-bar',
  standalone: true,
  imports: [CommonModule,CommonModule,
    HttpClientModule, HeaderMergedComponent],
  templateUrl: './view-attendance-common-bar.component.html',
  styleUrl: './view-attendance-common-bar.component.css',
  providers: [AdminService]
})
export class ViewAttendanceCommonBarComponent implements OnInit{
  StudentAttendance: any = "";

  adminService = inject(AdminService);
  router = inject(Router);

  subjectSwitchOptionListForViewAttendance: any;
  subjectSwitchOptionListForViewAttendanceFormatted: any;

  role: any = '';

  date: any = this.getCurrentDate();
  year: String = '';
  semester: String = '';
  branch: String = '';
  division: String = '';
  modeList: any = '';
  applicableBatchNamesList: any = '';
  subjectName: String = '';

  academicObj: any;
  modeSelected: String = '';
  applicableBatchNamesSelected: String = '';
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

  getsubjectSwitchOptionListForViewAttendanceFormatted() {
    // Check if subjectSwitchOptionListForViewAttendance exists and has data
    if (
      this.subjectSwitchOptionListForViewAttendance &&
      this.subjectSwitchOptionListForViewAttendance.data &&
      this.subjectSwitchOptionListForViewAttendance.data.length > 0
    ) {
      // Create an array to store the transformed data
      const transformedData = [];

      // Iterate over each item in the data array
      for (const item of this.subjectSwitchOptionListForViewAttendance.data) {
        // Prepare an object with all the properties from the current item
        const dataItem = {
          year: item.year,
          semester: item.semester,
          branch: item.branch,
          division: item.division,
          sessionType: item.mode[0],
          batch: item.applicableBatchNames,
          subjectName: item.subject,
        };

        // Push the prepared object into the transformedData array
        transformedData.push(dataItem);
      }

      // Return the array of objects containing all the transformed data
      console.log(transformedData);

      return transformedData;
    } else {
      // If subjectSwitchOptionListForViewAttendance is not properly initialized or has no data, return null or handle the error accordingly
      console.log(null);
      return null;
    }
  }

  currentIndex = 0; // Initialize the current index to 0
  switchData(): void {
    // Increment the current index
    this.currentIndex++;

    // If the current index exceeds the length of the data array, reset it to 0
    if (this.currentIndex >= this.subjectSwitchOptionListForViewAttendanceFormatted.length) {
      this.currentIndex = 0;
    }
    // Update the displayed data based on the current index
    this.updateDisplayedData();
  }

  updateDisplayedData(): void {
    this.year = this.subjectSwitchOptionListForViewAttendanceFormatted[this.currentIndex].year;
    this.semester =
      this.subjectSwitchOptionListForViewAttendanceFormatted[this.currentIndex].semester;
    this.branch =
      this.subjectSwitchOptionListForViewAttendanceFormatted[this.currentIndex].branch;
    this.division =
      this.subjectSwitchOptionListForViewAttendanceFormatted[this.currentIndex].division;
    this.modeList =
      this.subjectSwitchOptionListForViewAttendanceFormatted[this.currentIndex].sessionType;
    this.applicableBatchNamesList =
      this.subjectSwitchOptionListForViewAttendanceFormatted[this.currentIndex].batch;
    this.subjectName =
      this.subjectSwitchOptionListForViewAttendanceFormatted[this.currentIndex].subjectName;

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
    if (firstValue === 'Lecture' || this.applicableBatchNamesSelected === 'Lecture') {
      selectElementBatch.disabled = true;
    } else {
      selectElementBatch.disabled = false;
    }
    if (firstValue !== 'Lecture') {
      selectElementBatch.disabled = false;
    }
  }

  onSessionTypeChange(selectedValue: string) {
    this.modeSelected = selectedValue;
    const selectElement = document.getElementById(
      'selectSession'
    ) as HTMLSelectElement;
    const selectElementBatch = document.getElementById(
      'selectBatch'
    ) as HTMLSelectElement;
    if (this.applicableBatchNamesSelected !== 'Lecture') {
      selectElementBatch.disabled = false;
    } else {
      selectElementBatch.disabled = true;
    }
  }

  onBatchChange(selectedValue: string) {
    this.applicableBatchNamesSelected = selectedValue;
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
    this.adminService.getSubjectSwitchOptionListForViewAttendanceService().subscribe({
      next: (res) => {
        this.subjectSwitchOptionListForViewAttendance = { ...res };
        // console.log("also inside",this.subjectSwitchOptionListForViewAttendance);

        console.log('inside func:', res);
        this.subjectSwitchOptionListForViewAttendanceFormatted =
          this.getsubjectSwitchOptionListForViewAttendanceFormatted();
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  getStudentList() {
    this.adminService
      .getAttendanceDataService(this.academicObj)
      .subscribe({
        next: (res) => {
          this.studentList = { ...res };
          console.log(res);
          this.StudentAttendance = res
          // this.studentListFormatted = this.getstudentListFormatted();
          // console.log(this.studentList);
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
    if (this.applicableBatchNamesSelected === '') {
      const selectElement = document.getElementById(
        'selectBatch'
      ) as HTMLSelectElement;
      const selectedOption = selectElement.options[0];
      const selectedValue = selectedOption.value;
      this.applicableBatchNamesSelected = selectedValue;
    }
    if (this.modeSelected === '') {
      const selectElement = document.getElementById(
        'selectSession'
      ) as HTMLSelectElement;
      const selectedOption = selectElement.options[0];
      const selectedValue = selectedOption.value;
      this.modeSelected = selectedValue;
    }

    this.academicObj = {
      year: this.year,
      semester: this.semester,
      branch: this.branch,
      division: this.division,
      sessionType: this.modeSelected,
      batch: this.applicableBatchNamesSelected,
      subjectName: this.subjectName,
    };
    console.log(this.academicObj);
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.getSubjectData();
  }

  createObjToSend() {
    // this.attendanceData = {
    //   date: this.date, // Use the date for which the attendance is being recorded
    //   teacherId: localStorage.getItem('_id'), // Assign the teacher's ObjectId
    //   year: this.year,
    //   semester: this.semester,
    //   branch: this.branch,
    //   subjectName: this.subjectName,
    //   studentList: this.studentListFormatted.map((student: Student) => ({
    //     studentId: student._id,
    //     state: student.status,
    //   })),
    //   sessionType: this.modeSelected, // Assign the session type (e.g., Lecture, Practical, Tutorial)
    //   batchBelongs: this.applicableBatchNamesSelected, // Assign the batch to which the attendance belongs
    //   remark: this.remark, // Provide any remark or note
    // };
    // console.log(this.attendanceData);

    // this.getAttendanceData()
  }

}
