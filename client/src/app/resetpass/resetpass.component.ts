import { Component } from '@angular/core';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-resetpass',
    standalone: true,
    templateUrl: './resetpass.component.html',
    styleUrl: './resetpass.component.css',
    imports: [HeaderMergedComponent,CommonModule,FormsModule]
})
export class ResetpassComponent {
  newPassword: string = '';
  confirmPassword: string = '';

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    else{
    this.newPassword = '';
    this.confirmPassword = '';
    alert("Password successfully changed.");
  }
}

}
