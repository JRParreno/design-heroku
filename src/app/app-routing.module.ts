import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentauthService } from './api/studentauth.service';

import { UserauthService } from './api/userauth.service';
import { ActivityComponent } from './pages/activity/activity.component';
import { ActivityfacultyComponent } from './pages/activityfaculty/activityfaculty.component';
import { AssessmentComponent } from './pages/assessment/assessment.component';
import { AssessmentrecordComponent } from './pages/assessmentrecord/assessmentrecord.component';
import { BookmodulefacultyComponent } from './pages/bookmodulefaculty/bookmodulefaculty.component';
import { BookmodulesComponent } from './pages/bookmodules/bookmodules.component';
import { ChapterComponent } from './pages/chapter/chapter.component';
import { ChapterfacultyComponent } from './pages/chapterfaculty/chapterfaculty.component';
import { ClassComponent } from './pages/class/class.component';
import { ClasslistComponent } from './pages/classlist/classlist.component';
import { FacultyComponent } from './pages/faculty/faculty.component';
import { FacultymainComponent } from './pages/facultymain/facultymain.component';
import { FacultyprofileComponent } from './pages/facultyprofile/facultyprofile.component';
import { FilecheckingComponent } from './pages/filechecking/filechecking.component';
import { RecordsComponent } from './pages/records/records.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { StudentComponent } from './pages/student/student.component';
import { StudenthomeComponent } from './pages/studenthome/studenthome.component';
import { StudentmainComponent } from './pages/studentmain/studentmain.component';
import { StudentprofileComponent } from './pages/studentprofile/studentprofile.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: "resetpassword", component: ResetpasswordComponent },
  { path: "portal/:id", component: WelcomeComponent },
  { path: "portal/:id/**", component: WelcomeComponent },
  {
    path: "faculty", component: FacultyComponent, children: [
      {
        path: "home", component: FacultymainComponent, children: [
          { path: "", redirectTo: "classlist", pathMatch: 'full' },
          { path: "chapter/:id", component: ChapterfacultyComponent },
          { path: "modules", component: ClasslistComponent },
          { path: "activity/:id/:type", component: ActivityfacultyComponent },
          { path: "activities", component: ClasslistComponent },
          //{ path: "classlist", component: ClasslistComponent },
          { path: "classlist", component: ClasslistComponent },
          { path: "class/:id", component: ClassComponent },
          { path: "profile", component: FacultyprofileComponent },
          { path: "records", component: RecordsComponent },
          { path: "file-check", component: FilecheckingComponent },
        ]
      },
      { path: "", redirectTo: "home", pathMatch: 'full' },
    ], canActivate: [UserauthService]
  },
  {
    path: "student", component: StudentComponent, children: [
      {
        path: "home", component: StudentmainComponent, children: [
          { path: "", component: StudenthomeComponent },
          { path: "modules", component: BookmodulesComponent },
          { path: "activity", component: ActivityComponent },
          { path: "assessment", component: AssessmentComponent },
          { path: "chapter/:id", component: ChapterComponent },
          { path: "profile", component: StudentprofileComponent },
          { path: "record", component: AssessmentrecordComponent },
        ]
      },
      { path: "", redirectTo: "home", pathMatch: 'full' },
    ], canActivate: [StudentauthService]
  },
  { path: "", redirectTo: "portal/student", pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
