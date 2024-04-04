import { Component } from '@angular/core';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-viewprofileteacher',
    standalone: true,
    templateUrl: './viewprofileteacher.component.html',
    styleUrl: './viewprofileteacher.component.css',
    imports: [HeaderMergedComponent,ReactiveFormsModule]
})
export class ViewprofileteacherComponent {

}
