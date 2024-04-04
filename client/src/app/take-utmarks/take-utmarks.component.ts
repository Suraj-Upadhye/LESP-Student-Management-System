import { Component } from '@angular/core';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-take-utmarks',
    standalone: true,
    templateUrl: './take-utmarks.component.html',
    styleUrl: './take-utmarks.component.css',
    imports: [HeaderMergedComponent,CommonModule,FormsModule]
})
export class TakeUTMarksComponent {


    users=[
        {
        roll:'01',
        Student_Name:'shubhamsargar',
        Ut1:'0',
        Ut2:'0',
        },
        {
            roll:'02',
            Student_Name:'shubhamsargar',
            Ut1:'0',
            Ut2:'0',
            }
    ]

    fun()
    {
        console.log(this.users)
    }

}
