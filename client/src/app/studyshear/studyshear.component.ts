import { Component } from '@angular/core';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";

@Component({
    selector: 'app-studyshear',
    standalone: true,
    templateUrl: './studyshear.component.html',
    styleUrl: './studyshear.component.css',
    imports: [HeaderMergedComponent]
})
export class StudyshearComponent {

}
