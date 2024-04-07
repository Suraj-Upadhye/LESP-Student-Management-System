import { Routes } from '@angular/router';
import { LoginpageallComponent } from './loginpageall/loginpageall.component';
import { SignupStudentComponent } from './signup-student/signup-student.component';
import { SignupteacherComponent } from './signupteacher/signupteacher.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { TakeattendanceComponent } from './takeattendance/takeattendance.component';
import { TakeUTMarksComponent } from './take-utmarks/take-utmarks.component';
import { StudyshearComponent } from './studyshear/studyshear.component';
import { Studyshear1Component } from './studyshear1/studyshear1.component';
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
import { HomepageTeacherHodComponent } from './homepage-teacher-hod/homepage-teacher-hod.component';
import { HomepagestudentComponent } from './homepagestudent/homepagestudent.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { ViewAttendanceIndividualComponent } from './view-attendance-individual/view-attendance-individual.component';
import { ViewUtmarksComponent } from './view-utmarks/view-utmarks.component';
import { ViewUtmarksIndividualComponent } from './view-utmarks-individual/view-utmarks-individual.component';
import { ViewAttendanceCommonBarComponent } from './view-attendance-common-bar/view-attendance-common-bar.component';


export const routes: Routes = [
    {path:'', component:LandingpagesComponent},
    {path:'login', component:LoginpageallComponent},
    {path:'about-us', component:AboutUspageComponent},
    {path:'contect-us', component:ContectUsComponent},
    
    {path:'signup', component:SignupStudentComponent},
    {path:'signup1', component:SignupteacherComponent},

    {path:'homepage-teacher-hod', component:HomepageTeacherHodComponent},
    {path:'homepage-student', component:HomepagestudentComponent},

    {path:'changepassword', component:ChangepasswordComponent},

    {path:'TakeAttendance', component:TakeattendanceComponent},
    {path:'TakeUTMarks', component:TakeUTMarksComponent},

    {path:'view-attendance', component:ViewAttendanceComponent},
    {path:'view-attendance-individual', component: ViewAttendanceIndividualComponent},
    {path:'view-attendance-common', component:ViewAttendanceCommonBarComponent},
    {path: 'view-utmarks', component:ViewUtmarksComponent},
    {path: 'view-utmarks-individual', component:ViewUtmarksIndividualComponent},

    {path:'StudyResource', component:StudyshearComponent},
    {path:'previousResource', component:Studyshear1Component},

    {path:'new-request', component:NewRequestComponent},

    {path:'allteacherlist', component:AllteacherlistComponent},
    {path:'allStudentlist', component:AllStudetnListComponent},

    {path:'leaveapplication', component:TeacherLeaveApplicationComponent},
    {path:'listrequest', component:ListStudentRequestComponent},

    {path:'viewprofilestudent', component:ViewprofilestudentComponent},
    {path:'viewprofileteacher', component:ViewprofileteacherComponent},

    {path:'forgot-password', component:ForgotpasswordComponent},
    {path:'reset-password/:token', component:ResetpassComponent},




    
];
