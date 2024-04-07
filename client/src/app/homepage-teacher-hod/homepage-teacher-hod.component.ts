import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderMergedComponent } from "../header-merged/header-merged.component";
import { RouterModule } from '@angular/router';
import { NewUserRequestsComponent } from '../new-user-requests/new-user-requests.component';

@Component({
  selector: 'app-homepage-teacher-hod',
  standalone: true,
  imports: [SidebarComponent, HeaderMergedComponent, RouterModule, NewUserRequestsComponent],
  templateUrl: './homepage-teacher-hod.component.html',
  styleUrl: './homepage-teacher-hod.component.css'
})
export class HomepageTeacherHodComponent {

}
