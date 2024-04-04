import { Component } from '@angular/core';
import { LoginPageForAllComponent } from '../login-page-for-all/login-page-for-all.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header-merged',
  standalone: true,
  imports: [LoginPageForAllComponent,SidebarComponent],
  templateUrl: './header-merged.component.html',
  styleUrl: './header-merged.component.css'
})
export class HeaderMergedComponent {

}
