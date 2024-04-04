import { Component } from '@angular/core';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";

@Component({
    selector: 'app-homepagestudent',
    standalone: true,
    templateUrl: './homepagestudent.component.html',
    styleUrl: './homepagestudent.component.css',
    imports: [HeaderMergedComponent]
})
export class HomepagestudentComponent {

}
