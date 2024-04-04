import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import{ MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";

@Component({
    selector: 'app-teacher-leave-application',
    standalone: true,
    templateUrl: './teacher-leave-application.component.html',
    styleUrl: './teacher-leave-application.component.css',
    imports: [MatFormFieldModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, HeaderMergedComponent]
})
export class TeacherLeaveApplicationComponent {

}
