import { Component } from '@angular/core';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-all-studetn-list',
    standalone: true,
    templateUrl: './all-studetn-list.component.html',
    styleUrl: './all-studetn-list.component.css',
    imports: [HeaderMergedComponent,CommonModule]
})
export class AllStudetnListComponent {

    selectedRole: string = 'student'; // Default role is 'student'

  constructor() {}

  // Method to handle role changes
  onRoleChange(role: string) {
    this.selectedRole = role;
  }

}
