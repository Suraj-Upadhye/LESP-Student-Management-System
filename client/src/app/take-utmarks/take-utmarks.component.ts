
import { Component, OnInit, inject } from '@angular/core';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { HttpClientModule } from '@angular/common/http';


interface Student {
  _id: string;
  rollNo: string;
  name: string;
  ut1: number;
  ut2: number;
}


@Component({
  selector: 'app-take-utmarks',
  standalone: true,
  templateUrl: './take-utmarks.component.html',
  styleUrl: './take-utmarks.component.css',
  imports: [HeaderMergedComponent, CommonModule, FormsModule, HttpClientModule],
  providers: [AdminService],
})
export class TakeUTMarksComponent implements OnInit {
  router = inject(Router);
  adminService = inject(AdminService);

  role: any = '';
  subjectSwitchOptionList: any;
  subjectSwitchOptionListFormatted: any;
  academicObj: any;
  studentList: any;
  studentListFormatted: Student[] = [];

  flagToDisplayTableData = false;

  UTData: any;

  year: String = '';
  semester: String = '';
  branch: String = '';
  division: String = '';
  subjectName: String = '';
  ut1: String = '0';
  ut2: String = '0';

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.getSubjectData();
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
          subjectName: item.subject,
        };
        console.log('Dataitem : ', dataItem);

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
    this.subjectName =
      this.subjectSwitchOptionListFormatted[this.currentIndex].subjectName;
  }

  
  showStudentList(){
    this.academicObj = {
        year: this.year,
        semester: this.semester,
        branch: this.branch,
        division: this.division,
        subjectName: this.subjectName,
      };
      console.log(this.academicObj);
      this.getStudentList();
  }



  getStudentList() {
    this.adminService
      .getStudentDataForFillUTMarksService(this.academicObj)
      .subscribe({
        next: (res) => {
          this.studentList = { ...res };
          console.log(res);
          this.studentListFormatted = this.getstudentListFormatted() as Student[];
          // console.log(this.studentList);
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
        },
      });
  }


  getstudentListFormatted() {
    if (
      this.studentList &&
      this.studentList.message &&
      this.studentList.message.length > 0
    ) {
      const transformedData: Student[] = [];

      for (const item of this.studentList.message) {
        const dataItem: Student = {
          _id: item._id,
          rollNo: item.rollNo,
          name: item.firstName + ' ' + item.middleName + ' ' + item.lastName,
          ut1: 0, // Initialize ut1 to 0
          ut2: 0, // Initialize ut2 to 0
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



  onSaveUnitTestMarks() {
    console.log(this.studentListFormatted);
    this.createObjToSend();
  }

  createObjToSend() {
    this.UTData = {
      teacher: localStorage.getItem('_id'), // Assign the teacher's ObjectId
      year: this.year,
      semester: this.semester,
      division: this.division,
      branch: this.branch,
      subjectName: this.subjectName,
      studentList: this.studentListFormatted.map((student: Student) => ({
        student: student._id,
        ut1: student.ut1,
        ut2: student.ut2,
      })),
    };
    console.log(this.UTData);
    this.saveUTData();
}




  saveUTData() {
    this.adminService.addAndUpdateMarksSubjectWiseService(this.UTData).subscribe({
      next: (res) => {
        console.log(res);
        alert(res.message);
        // this.router.navigate(['homepage-teacher-hod']);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
        // this.router.navigate(['homepage-teacher-hod']);
      },
    });
  }


  changeUT1Marks(index: number, ut1: number): void {
    console.log(index);
    console.log(this.studentListFormatted[index]);
    this.studentListFormatted[index].ut1 = ut1;
  }

  changeUT2Marks(index: number, ut2: number): void {
    console.log(index);
    console.log(this.studentListFormatted[index]);
    this.studentListFormatted[index].ut2 = ut2;
  }
  


}
