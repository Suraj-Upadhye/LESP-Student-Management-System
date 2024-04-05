import { Component } from '@angular/core';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
    selector: 'app-homepagestudent',
    standalone: true,
    templateUrl: './homepagestudent.component.html',
    styleUrl: './homepagestudent.component.css',
    imports: [HeaderMergedComponent, SidebarComponent]
})
export class HomepagestudentComponent {

}
