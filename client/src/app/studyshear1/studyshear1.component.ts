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
          description: "Environmental Studies MCQ Part-2",
          dateTime: "31/03/2024 8:17"
        },
        {
            type: "PDF",
            description: "Environmental Studies MCQ Part-1",
            dateTime: "31/03/2024 8:17"
          },
        
      ];

      fun(){
        console.log(this.tableData)
      }

}
