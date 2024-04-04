import { Component } from '@angular/core';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";

@Component({
    selector: 'app-list-teacher-request',
    standalone: true,
    templateUrl: './list-teacher-request.component.html',
    styleUrl: './list-teacher-request.component.css',
    imports: [HeaderMergedComponent]
})
export class ListTeacherRequestComponent {

}
