import { Component, OnInit, inject } from '@angular/core';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../services/admin.service';

interface Student {
  _id: string;
  rollNo: string;
  name: string;
  ut1: number;
  ut2: number;
}

@Component({
  selector: 'app-view-utmarks',
  standalone: true,
  imports: [HeaderMergedComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './view-utmarks.component.html',
  styleUrl: './view-utmarks.component.css',
  providers:[AdminService]
})
export class ViewUtmarksComponent implements OnInit{
  
  adminService = inject(AdminService);
  role: any = '';

  year: String = '';
  semester: String = '';
  branch: String = '';
  division: String = '';
  subjectName: String = '';
  ut1: String = '0';
  ut2: String = '0';

  subjectSwitchOptionList: any;
  subjectSwitchOptionListFormatted: any;
  academicObj: any;
  studentList: any;
  studentListFormatted: Student[] = [];

  flagToDisplayTableData = false;

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
      .getAllUserMarksSubjectWiseService(this.academicObj)
      .subscribe({
        next: (res) => {
          this.studentList = { ...res };
          console.log(res);
         this.users = res.users;
          // console.log(this.studentList);
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
        },
      });
  }


users = [
  {
    roll: '0',
    name: '',
    ut1: 0,
    ut2: 0,
    averageMarks:'0'
  },
];


  // users = [
  //   {
  //     roll: '1',
  //     name: 'manas',
  //     ut1: 19,
  //     ut2: 20,
  //     averageMarks:'1'
  //   },
  //   {
  //     roll: '2',
  //     name: 'patil',
  //     ut1: 19,
  //     ut2: 20,
  //     averageMarks:'1'
  //   },
  //   {
  //     roll: '3',
  //     name: 'amar',
  //     ut1: 19,
  //     ut2: 20,
  //     averageMarks:'1'
  //   },
  //   {
  //     roll: '4',
  //     name: 'sam',
  //     ut1: 19,
  //     ut2: 20,
  //     averageMarks:'1'
  //   },
  //   {
  //     roll: '5',
  //     name: 'manas',
  //     ut1: 19,
  //     ut2: 20,
  //     averageMarks:'1'
  //   },
  //   {
  //     roll: '6',
  //     name: 'patil',
  //     ut1: 19,
  //     ut2: 20,
  //     averageMarks:'1'
  //   },
  //   {
  //     roll: '7',
  //     name: 'amar',
  //     ut1: 19,
  //     ut2: 20,
  //     averageMarks:'1'
  //   },
  //   {
  //     roll: '8',
  //     name: 'sam',
  //     ut1: 19,
  //     ut2: 20,
  //     averageMarks:'1'
  //   },
  //   {
  //     roll: '9',
  //     name: 'manas',
  //     ut1: 19,
  //     ut2: 20,
  //     averageMarks:'1'
  //   },
  //   {
  //     roll: '10',
  //     name: 'patil',
  //     ut1: 19,
  //     ut2: 20,
  //     averageMarks:'1'
  //   },
  //   {
  //     roll: '11',
  //     name: 'amar',
  //     ut1: 19,
  //     ut2: 20,
  //     averageMarks:'1'
  //   },
  //   {
  //     roll: '12',
  //     name: 'sam',
  //     ut1: 19,
  //     ut2: 20,
  //     averageMarks:'1'
  //   }
  // ];

  submit(){
    console.log(this.users);
  }


  downloadPDF() {
    const element = document.getElementById('tblinfo') as HTMLTableElement;
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const docDefinition = {
        content: [{
          image: imgData,
          width: 500,
          orientation: 'landscape'
        }],
        Orientation: 'landscape'
      };
      pdfMake.createPdf(docDefinition).download("attendance.pdf");
    });

}



}
