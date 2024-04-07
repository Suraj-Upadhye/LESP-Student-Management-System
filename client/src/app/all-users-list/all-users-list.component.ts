import { Component } from '@angular/core';
import { HeaderMergedComponent } from '../header-merged/header-merged.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-users-list',
  standalone: true,
  imports: [HeaderMergedComponent, CommonModule],
  templateUrl: './all-users-list.component.html',
  styleUrl: './all-users-list.component.css'
})
export class AllUsersListComponent {

  selectedRole: string = 'student'; // Default role is 'student'

  constructor() {}

  // Method to handle role changes
  onRoleChange(role: string) {
    this.selectedRole = role;
  }
}
