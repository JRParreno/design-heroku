import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API: any;

  constructor(private http: HttpClient, private zone: NgZone) {
    this.API = 'https://tebackendapi.herokuapp.com';
  }


  getIPaddress() {
    return this.http.get<any>("http://api.ipify.org/?format=json");
  }

  /*getgetstudents() {
    return this.http.get<any>("http://localhost:8000/api/student/list/");
  }*/

  loginstudent(param: any) {
    /* backend link
       request body (data) -> username, password
       get data in the param*/
    return this.http.post<any>("", param);
  }

  loginprofessor(param: any) {
    /* backend link
       request body (data) -> username, password
       get data in the param*/
    return this.http.post<any>(this.API + "/api/auth/professor/login", param);
  }

  createprofessor(param: any) {
    /* create/save professor/user */
    /* backend link
       request body (data) -> username, password, name, etc.(professor credentials)
       get data in the param*/
    return this.http.post<any>(this.API + "/api/auth/professor/register", param);
  }

  getsectionlistperprof(profid: any) {
    /* get list of section of professor */
    /* backend link
       link parameter -> profid (string)*/
    return this.http.get<any>("" + profid);
  }

  savesection(param: any) {
    /* create/save section/block */
    /* backend link
       request body (data) -> sectioncode, sched,etc.(section credentials)
       get data in the param*/
    return this.http.post<any>("", param);
  }


  getsection(sectionid: any) {
    /* get section details */
    /* backend link
       link parameter -> sectionid (string)*/
    return this.http.get<any>("" + sectionid);
  }

  getstudentspersection(sectionid: any) {
    /* get students(list) per section via sectionid */
    /* backend link
       link parameter -> sectionid (string)*/
    return this.http.get<any>("" + sectionid);
  }

  savestudent(param: any) {
    /* create/save student per section */
    /* backend link
       request body (data) -> sectionid, studentid,etc.(student credentials)
       get data in the param*/
    return this.http.post<any>("", param);
  }

  getactivity(activityid) {

  }

  getstudentassesments(studentid: string) {
    /* get studentassessment(list) per studentid */
    /* backend link
       link parameter -> studentid (string)*/
    return this.http.get<any>("" + studentid);
  }

  getstudentdetails(studentid: string) {
    /* get student details */
    /* backend link
       link parameter -> studentid (string)*/
    return this.http.get<any>("" + studentid);
  }

  updatestudent(param: any) {
    /* update/save student details */
    /* backend link
       request body (data) -> sectionid, studentid,etc.(student credentials)
       get data in the param*/
    /*could be POST or PUT method (for confirmation) */
    return this.http.post<any>("", param);
  }

  submitactivity(param: any) {
    /* submit activity then process score and save details*/
    /* backend link
       request body (data) -> activity question list
       get data in the param*/
    return this.http.post<any>("", param);
  }

  getquestionsperactivity(activityid: string) {
    //return (object/class)questions[] : list
    return this.http.get<any>("" + activityid);
  }


  forgotpassword(email: string) {
    let url = "https://al-online.herokuapp.com/faculty/home/profile";
    return this.http.post<any>("/api/auth/request-reset-email", { email: email, redirect_url: url });
  }

}
