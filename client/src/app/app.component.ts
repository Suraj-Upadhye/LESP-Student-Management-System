import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { RouterOutlet } from '@angular/router';
import { SignupStudentComponent } from "./signup-student/signup-student.component";
import { SignupteacherComponent } from "./signupteacher/signupteacher.component";
import { ViewprofilestudentComponent } from "./viewprofilestudent/viewprofilestudent.component";
import { ViewprofileteacherComponent } from "./viewprofileteacher/viewprofileteacher.component";

import { TeacherLeaveApplicationComponent } from "./Send-leave-application/teacher-leave-application.component";
import { AllStudetnListComponent } from "./all-student-list/all-studetn-list.component";
import { NewstudentRequsetpageComponent } from "./newstudent-requsetpage/newstudent-requsetpage.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TakeattendanceComponent } from "./takeattendance/takeattendance.component";
import {MatDatepickerModule} from '@angular/material/datepicker';
import{ MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { TakeUTMarksComponent } from "./take-utmarks/take-utmarks.component";
import { LoginpageallComponent } from "./loginpageall/loginpageall.component";
import { HomepageComponent } from "./homepage-hod/homepage.component";
import { StudyshearComponent } from "./studyshear/studyshear.component";
import { Studyshear1Component } from "./studyshear1/studyshear1.component";
import { AllteacherlistComponent } from "./allteacherlist/allteacherlist.component";
import { ListTeacherRequestComponent } from "./list-teacher-request/list-teacher-request.component";
import { ListStudentRequestComponent } from "./list-student-request/list-student-request.component";
import { ChangepasswordComponent } from "./changepassword/changepassword.component";
import { ForgotpasswordComponent } from "./forgotpassword/forgotpassword.component";
import { ViewprofileHODComponent } from "./viewprofile-hod/viewprofile-hod.component";
import { ViewUtmarksComponent } from "./view-utmarks/view-utmarks.component";
import { HeaderMergedComponent } from './header-merged/header-merged.component';
import { LoginPageForAllComponent } from './login-page-for-all/login-page-for-all.component';
import { HomepagestudentComponent } from "./homepagestudent/homepagestudent.component";
import { LandingpagesComponent } from "./landingpages/landingpages.component";
import { PromptsignupComponent } from "./promptsignup/promptsignup.component";
import { ResetpassComponent } from './resetpass/resetpass.component';
import { AboutUspageComponent } from "./about-uspage/about-uspage.component";
import { ContectUsComponent } from "./contect-us/contect-us.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SignupStudentComponent, SignupteacherComponent, ViewprofilestudentComponent, ViewprofileteacherComponent, TeacherLeaveApplicationComponent, AllStudetnListComponent, NewstudentRequsetpageComponent, SidebarComponent, TakeattendanceComponent, MatDatepickerModule, MatInputModule, MatNativeDateModule, TakeUTMarksComponent, LoginpageallComponent, HomepageComponent, StudyshearComponent, Studyshear1Component, AllteacherlistComponent, ListTeacherRequestComponent, ListStudentRequestComponent, ChangepasswordComponent, ForgotpasswordComponent, ViewprofileHODComponent, ViewUtmarksComponent, HeaderMergedComponent, LoginPageForAllComponent, HomepagestudentComponent, LandingpagesComponent, PromptsignupComponent, ResetpassComponent, AboutUspageComponent, ContectUsComponent]
})
export class AppComponent {
  title = 'megaproject';

  fun(){
    var uuid=uuidv4(); 
    console.log(uuid)

  }
}
