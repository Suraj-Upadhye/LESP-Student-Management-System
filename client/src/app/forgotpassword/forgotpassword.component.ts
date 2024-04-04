import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";

@Component({
    selector: 'app-forgotpassword',
    standalone: true,
    templateUrl: './forgotpassword.component.html',
    styleUrl: './forgotpassword.component.css',
    imports: [CommonModule, FormsModule, JsonPipe, HeaderMergedComponent]
})
export class ForgotpasswordComponent {
  isFormSubmited: boolean=false;

  userObj: any={
   
    Email:'',
  }
  onSubmit(){
    this.isFormSubmited=true;
  }

}
