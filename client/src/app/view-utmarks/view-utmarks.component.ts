import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';

@Component({
  selector: 'app-view-utmarks',
  standalone: true,
  imports: [HeaderMergedComponent],
  templateUrl: './view-utmarks.component.html',
  styleUrl: './view-utmarks.component.css'
})
export class ViewUtmarksComponent {


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
