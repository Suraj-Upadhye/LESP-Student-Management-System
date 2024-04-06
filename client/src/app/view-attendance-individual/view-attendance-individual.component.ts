import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';

@Component({
  selector: 'app-view-attendance-individual',
  standalone: true,
  imports: [CommonModule, HeaderMergedComponent],
  templateUrl: './view-attendance-individual.component.html',
  styleUrl: './view-attendance-individual.component.css'
})
export class ViewAttendanceIndividualComponent {
  totalLecture = 24;
  
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
  }
  
}
