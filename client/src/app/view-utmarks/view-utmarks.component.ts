import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-utmarks',
  standalone: true,
  imports: [HeaderMergedComponent, CommonModule],
  templateUrl: './view-utmarks.component.html',
  styleUrl: './view-utmarks.component.css'
})
export class ViewUtmarksComponent {

   students = [
    { rollNo: 1, name: 'John Doe', ut1Marks: 17, ut2Marks: 15, rank: 1 },
    { rollNo: 2, name: 'Jane Smith', ut1Marks: 14, ut2Marks: 18, rank: 2 },
    { rollNo: 3, name: 'Alice Johnson', ut1Marks: 18, ut2Marks: 17, rank: 3 },
    { rollNo: 4, name: 'Bob Brown', ut1Marks: 15, ut2Marks: 16, rank: 4 },
    { rollNo: 5, name: 'Emma Lee', ut1Marks: 13, ut2Marks: 14, rank: 5 },
    { rollNo: 6, name: 'David Wilson', ut1Marks: 16, ut2Marks: 19, rank: 6 },
    { rollNo: 7, name: 'Sarah Martinez', ut1Marks: 13, ut2Marks: 15, rank: 7 },
    { rollNo: 8, name: 'Michael Taylor', ut1Marks: 16, ut2Marks: 17, rank: 8 },
    { rollNo: 9, name: 'Olivia Anderson', ut1Marks: 15, ut2Marks: 16, rank: 9 },
    { rollNo: 10, name: 'William Hernandez', ut1Marks: 18, ut2Marks: 17, rank: 10 }
];


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
