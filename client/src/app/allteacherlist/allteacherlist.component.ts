import { Component } from '@angular/core';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";

@Component({
    selector: 'app-allteacherlist',
    standalone: true,
    templateUrl: './allteacherlist.component.html',
    styleUrl: './allteacherlist.component.css',
    imports: [HeaderMergedComponent]
})
export class AllteacherlistComponent {

}
