import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ViewAttendanceCommonBarComponent } from '../view-attendance-common-bar/view-attendance-common-bar.component';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-view-attendance-individual',
  standalone: true,
  imports: [CommonModule, HeaderMergedComponent, HttpClientModule],
  templateUrl: './view-attendance-individual.component.html',
  styleUrl: './view-attendance-individual.component.css',
  providers: [AdminService],
})
export class ViewAttendanceIndividualComponent implements OnInit {
  adminService = inject(AdminService);

  year: string = '';
  semester: string = '';
  branch: string = '';

  subjectList: any;

  selectedSubject: string = '';

  user = [
    {
      sr_no: '1',
      s_name: 'PWP',
      p_no: '',
      lno_1: 'p',
      lno_2: 'p',
      lno_3: 'p',
      lno_4: 'p',
      lno_5: '',
      lno_6: '',
      lno_7: '',
      lno_8: '',
      lno_9: '',
      lno_10: '',
      lno_11: '',
      lno_12: '',
      lno_13: '',
      lno_14: '',
      lno_15: '',
      lno_16: '',
      lno_17: 'p',
      lno_18: '',
      lno_19: '',
      lno_20: 'p',
      lno_21: '',
      lno_22: '',
      lno_23: '',
      lno_24: '',
      tp: '15',
      ta: '9',
      per: '47%',

      d1: '23/1/24',
      d2: '23/1/24',
      d3: '23/1/24',
      d4: '23/1/24',
      d5: '23/1/24',
      d6: '23/1/24',
      d7: '23/1/24',
      d8: '23/1/24',
      d9: '23/1/24',
      d10: '23/1/24',
      d11: '23/1/24',
      d12: '23/1/24',
      d13: '23/1/24',
      d14: '23/1/24',
      d15: '23/1/24',
      d16: '23/1/24',
      d17: '23/1/24',
      d18: '23/1/24',
      d19: '23/1/24',
      d20: '23/1/24',
      d21: '23/1/24',
      d22: '23/1/24',
      d23: '23/1/24',
      d24: '23/1/24',
    },
  ];

  ngOnInit(): void {
    this.getSubjectListByCurrentUser();
  }

  // getSubjectListByYSBService
  getSubjectListByCurrentUser() {
    this.adminService.getSubjectListByCurrentUserService().subscribe({
      next: (res) => {
        console.log(res);
        this.subjectList = res.data;
        // this.users = res.users;
        // this.studentList = { ...res };
        // console.log(this.studentList);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  onSelectChange(selectedValue: string) {
    this.selectedSubject = selectedValue;
    console.log(selectedValue);
    this.getAttendanceSubjectWiseSingleStudent();
  }

  getAttendanceSubjectWiseSingleStudent() {
    this.adminService.getAttendanceSubjectWiseSingleStudentService().subscribe({
      next: (res) => {
        console.log(res);
        // this.subjectList = res.data;
        // this.users = res.users;
        // this.studentList = { ...res };
        // console.log(this.studentList);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  @Input() StudentAttendance: any;

  totalLecture = 24;

  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  downloadPDF() {
    const element = document.getElementById('tblinfo') as HTMLTableElement;
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const docDefinition = {
        content: [
          {
            image: imgData,
            width: 500,
          },
        ],
      };
      pdfMake.createPdf(docDefinition).download('attendance.pdf');
    });
  }
}
