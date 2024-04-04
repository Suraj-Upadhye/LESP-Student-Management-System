import { Routes } from '@angular/router';
import { LoginpageallComponent } from './loginpageall/loginpageall.component';
import { SignupStudentComponent } from './signup-student/signup-student.component';
import { SignupteacherComponent } from './signupteacher/signupteacher.component';
import { HomepageComponent } from './homepage-hod/homepage.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { TakeattendanceComponent } from './takeattendance/takeattendance.component';
import { TakeUTMarksComponent } from './take-utmarks/take-utmarks.component';
import { StudyshearComponent } from './studyshear/studyshear.component';
import { Studyshear1Component } from './studyshear1/studyshear1.component';
import { NewstudentRequsetpageComponent } from './newstudent-requsetpage/newstudent-requsetpage.component';
// import { NewteacherRequsetpageComponent } from './newteacher-requsetpage/newteacher-requsetpage.component';
import { AllteacherlistComponent } from './allteacherlist/allteacherlist.component';
import { TeacherLeaveApplicationComponent } from './Send-leave-application/teacher-leave-application.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LandingpagesComponent } from './landingpages/landingpages.component';
import { AllStudetnListComponent } from './all-student-list/all-studetn-list.component';
import { ListStudentRequestComponent } from './list-student-request/list-student-request.component';
import { ViewprofilestudentComponent } from './viewprofilestudent/viewprofilestudent.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { ViewprofileteacherComponent } from './viewprofileteacher/viewprofileteacher.component';
import { AboutUspageComponent } from './about-uspage/about-uspage.component';
import { ContectUsComponent } from './contect-us/contect-us.component';
export const routes: Routes = [
    {path:'', component:LandingpagesComponent},
    {path:'login', component:LoginpageallComponent},
    {path:'about-us', component:AboutUspageComponent},
    {path:'contect-us', component:ContectUsComponent},
    {path:'signup', component:SignupStudentComponent},
    {path:'signup1', component:SignupteacherComponent},
    {path:'homepage', component:HomepageComponent},
    {path:'forget', component:ForgotpasswordComponent},
    {path:'changepassword', component:ChangepasswordComponent},
    {path:'TakeAttendance', component:TakeattendanceComponent},
    {path:'TakeUTMarks', component:TakeUTMarksComponent},
    {path:'StudyResource', component:StudyshearComponent},
    {path:'previousResource', component:Studyshear1Component},
    {path:'newstudent', component:NewstudentRequsetpageComponent},
    // {path:'newteacher', component:NewteacherRequsetpageComponent},
    {path:'allteacherlist', component:AllteacherlistComponent},
    {path:'allStudentlist', component:AllStudetnListComponent},
    {path:'leaveapplication', component:TeacherLeaveApplicationComponent},
    {path:'listrequest', component:ListStudentRequestComponent},
    {path:'viewprofilestudent', component:ViewprofilestudentComponent},
    {path:'resetpass', component:ResetpassComponent},
    {path:'viewprofileteacher', component:ViewprofileteacherComponent},





    
];
