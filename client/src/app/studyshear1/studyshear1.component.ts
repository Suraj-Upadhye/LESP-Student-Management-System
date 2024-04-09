import { Component } from '@angular/core';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-studyshear1',
    standalone: true,
    templateUrl: './studyshear1.component.html',
    styleUrl: './studyshear1.component.css',
    imports: [HeaderMergedComponent, CommonModule]
})
export class Studyshear1Component {

    tableData = [
        {
          type: "PDF",
          description: "Description of the PDF whatever may be",
          dateTime: "31/3/2024 8:00"
        },
        {
            type: "PDF",
            description: "Description of the PDF whatever may be",
            dateTime: "32/3/2024 9:00"
          },
        
      ];

      fun(){
        console.log(this.tableData)
      }

}
