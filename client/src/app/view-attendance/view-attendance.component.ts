import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ViewAttendanceCommonBarComponent } from '../view-attendance-common-bar/view-attendance-common-bar.component';

@Component({
  selector: 'app-view-attendance',
  standalone: true,
  imports: [CommonModule, ViewAttendanceCommonBarComponent],
  templateUrl: './view-attendance.component.html',
  styleUrl: './view-attendance.component.css'
})
export class ViewAttendanceComponent {


  totalLecture = 24;
  sessionType: String ="Practical";
  
  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  constructor() {
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  downloadPDF() {
    const element = document.getElementById('tblinfo') as HTMLTableElement;
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const docDefinition = {
        content: [{
          image: imgData,
          width: 500
        }]
      };
      pdfMake.createPdf(docDefinition).download("attendance.pdf");
    });

  // window.print()
  }
  
  
  

}

