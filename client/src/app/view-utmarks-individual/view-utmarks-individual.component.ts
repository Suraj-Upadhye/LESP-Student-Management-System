import { Component, OnInit, inject } from '@angular/core';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-view-utmarks-individual',
  standalone: true,
  imports: [HeaderMergedComponent, CommonModule, HttpClientModule],
  templateUrl: './view-utmarks-individual.component.html',
  styleUrl: './view-utmarks-individual.component.css',
  providers:[AdminService]
})
export class ViewUtmarksIndividualComponent implements OnInit{

  adminService = inject(AdminService);
  userMarksData: any;

  ngOnInit(): void {
   this.getUserMarksAllSubjectsCombined();
  }

  // getUserMarksAllSubjectsCombinedService
  getUserMarksAllSubjectsCombined(){
    this.adminService.getUserMarksAllSubjectsCombinedService().subscribe({
      next: (res) => {
        console.log(res);
        this.userMarksData = res;
        this.users = res;
        // alert(res.message);
        // this.router.navigate(['homepage-teacher-hod']);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
        // this.router.navigate(['homepage-teacher-hod']);
      },
    });
  }

  onsubmit(){
    console.log(this.users);
  }

  users = [
    {
      sr_no: '1',
      s_name: 'PWP',
      ut1: 20,
      ut2: 20,
      averageMarks: '20',
    },
    {
      sr_no: '2',
      s_name: 'NIS',
      ut1: 20,
      ut2: 20,
      averageMarsk: '20',
    },
    {
      sr_no: '3',
      s_name: 'ETI',
      ut1: 20,
      ut2: 20,
      averageMarks: '20',
    },
    {
      sr_no: '4',
      s_name: 'MAD',
      ut1: 20,
      ut2: 20,
      averageMarks: '20',
    },
    {
      sr_no: '5',
      s_name: 'MGT',
      ut1: 20,
      ut2: 20,
      averageMarks: '20',
    },
  ];

  downloadPDF() {
    const element = document.getElementById('tblinfo') as HTMLTableElement;
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const docDefinition = {
        content: [
          {
            image: imgData,
            width: 500,
            orientation: 'landscape',
          },
        ],
        Orientation: 'landscape',
      };
      pdfMake.createPdf(docDefinition).download('utmarks_student.pdf');
    });
  }
}
