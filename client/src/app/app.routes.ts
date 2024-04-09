import { Routes } from '@angular/router';
import { LoginpageallComponent } from './loginpageall/loginpageall.component';
import { SignupStudentComponent } from './signup-student/signup-student.component';
import { SignupteacherComponent } from './signupteacher/signupteacher.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { TakeattendanceComponent } from './takeattendance/takeattendance.component';
import { TakeUTMarksComponent } from './take-utmarks/take-utmarks.component';
import { StudyshearComponent } from './studyshear/studyshear.component';
import { Studyshear1Component } from './studyshear1/studyshear1.component';
import { TeacherLeaveApplicationComponent } from './Send-leave-application/teacher-leave-application.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LandingpagesComponent } from './landingpages/landingpages.component';
import { ViewprofilestudentComponent } from './viewprofilestudent/viewprofilestudent.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { ViewprofileteacherComponent } from './viewprofileteacher/viewprofileteacher.component';
import { AboutUspageComponent } from './about-uspage/about-uspage.component';
import { ContectUsComponent } from './contect-us/contect-us.component';
import { HomepageTeacherHodComponent } from './homepage-teacher-hod/homepage-teacher-hod.component';
import { HomepagestudentComponent } from './homepagestudent/homepagestudent.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { ViewAttendanceIndividualComponent } from './view-attendance-individual/view-attendance-individual.component';
import { ViewUtmarksComponent } from './view-utmarks/view-utmarks.component';
import { ViewUtmarksIndividualComponent } from './view-utmarks-individual/view-utmarks-individual.component';
import { ViewAttendanceCommonBarComponent } from './view-attendance-common-bar/view-attendance-common-bar.component';
import { AllUsersListComponent } from './all-users-list/all-users-list.component';
import { NewUserRequestsComponent } from './new-user-requests/new-user-requests.component';
import { AllLeaveRequestsComponent } from './all-leave-requests/all-leave-requests.component';
import { SignupHodComponent } from './signup-hod/signup-hod.component';
import { ViewprofileHODComponent } from './viewprofile-hod/viewprofile-hod.component';


export const routes: Routes = [
    {path:'', component:LandingpagesComponent},
    {path:'login', component:LoginpageallComponent},
    {path:'about-us', component:AboutUspageComponent},
    {path:'contect-us', component:ContectUsComponent},
    
    {path:'signup-student', component:SignupStudentComponent},
    {path:'signup-teacher', component:SignupteacherComponent},
    {path:'signup-hod', component:SignupHodComponent},

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

    {path:'all-users-list', component:AllUsersListComponent},
    {path:'new-user-requests', component:NewUserRequestsComponent},
    {path:'all-leave-requests', component:AllLeaveRequestsComponent},

    {path:'leaveapplication', component:TeacherLeaveApplicationComponent},

    {path:'viewprofilestudent', component:ViewprofilestudentComponent},
    {path:'viewprofileteacher', component:ViewprofileteacherComponent},
    {path:'viewprofilehod', component:ViewprofileHODComponent},

    {path:'forgot-password', component:ForgotpasswordComponent},
    {path:'reset-password/:token', component:ResetpassComponent},




    
];
