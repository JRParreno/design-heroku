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
    return this.http.post<any>("", param);
  }

  loginprofessor(param: any) {
    return this.http.post<any>(this.API + "/api/auth/professor/login/", param);
  }

  getprofessor(username: string) {
    return this.http.get<any>(this.API + "/api/user/profile/professor/" + username + "/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });

  }

  createprofessor(param: any) {
    return this.http.post<any>(this.API + "/api/auth/professor/register/", param);
  }

  getsectionlistperprof(profid: any) {
    return this.http.get<any>(this.API + "/api/section/viewset/list/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  savesection(param: any) {
    return this.http.post<any>(this.API + "/api/section/viewset/list/", param);
  }


  getsection(id: any) {
    return this.http.get<any>(this.API + "/api/section/viewset/list/" + id, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  getstudentspersection(sectionid: any) {
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

  getstudentdetails(username: string) {
    return this.http.get<any>(this.API + "/api/user/profile/student/" + username + "/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });

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
