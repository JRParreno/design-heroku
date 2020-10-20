import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { ActivityfacultyComponent } from './pages/activityfaculty/activityfaculty.component';
import { AssessmentComponent } from './pages/assessment/assessment.component';
import { AssessmentrecordComponent } from './pages/assessmentrecord/assessmentrecord.component';
import { BackofficeComponent } from './pages/backoffice/backoffice.component';
import { BookmodulefacultyComponent } from './pages/bookmodulefaculty/bookmodulefaculty.component';
import { BookmodulesComponent } from './pages/bookmodules/bookmodules.component';
import { ChapterComponent } from './pages/chapter/chapter.component';
import { ChapterfacultyComponent } from './pages/chapterfaculty/chapterfaculty.component';
import { ClassComponent } from './pages/class/class.component';
import { ClasslistComponent } from './pages/classlist/classlist.component';
import { FacultyComponent } from './pages/faculty/faculty.component';
import { FacultyloginComponent } from './pages/facultylogin/facultylogin.component';
import { FacultymainComponent } from './pages/facultymain/facultymain.component';
import { FacultyprofileComponent } from './pages/facultyprofile/facultyprofile.component';
import { RecordsComponent } from './pages/records/records.component';
import { StudentComponent } from './pages/student/student.component';
import { StudenthomeComponent } from './pages/studenthome/studenthome.component';
import { StudentloginComponent } from './pages/studentlogin/studentlogin.component';
import { StudentmainComponent } from './pages/studentmain/studentmain.component';
import { StudentprofileComponent } from './pages/studentprofile/studentprofile.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivityComponent,
    ActivityfacultyComponent,
    AssessmentComponent,
    AssessmentrecordComponent,
    BackofficeComponent,
    BookmodulefacultyComponent,
    BookmodulesComponent,
    ChapterComponent,
    ChapterfacultyComponent,
    ClassComponent,
    ClasslistComponent,
    FacultyComponent,
    FacultyloginComponent,
    FacultymainComponent,
    FacultyprofileComponent,
    RecordsComponent,
    StudentComponent,
    StudenthomeComponent,
    StudentloginComponent,
    StudentmainComponent,
    StudentprofileComponent,
    WelcomeComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
