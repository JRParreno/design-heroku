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

  loginstudent(param: any) {
    return this.http.post<any>(this.API + "/api/auth/student/login/", param);
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

  getsectionlistperprof() {
    return this.http.get<any>(this.API + "/api/section/viewset/list/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  savesection(param: any) {
    return this.http.post<any>(this.API + "/api/section/viewset/list/", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }


  getsection(id: any) {
    return this.http.get<any>(this.API + "/api/section/viewset/list/" + id, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  getstudentspersection(sectionid: any) {
    return this.http.get<any>(this.API + "/api/section/students/" + sectionid + "/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  savestudent(param: any, sectionid) {
    return this.http.post<any>(this.API + "/api/section/students/" + sectionid + "/", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  getactivity(id) {
    return this.http.get<any>(this.API + "/api/activity/viewset/list/" + id + "/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });

  }

  listactivity() {
    return this.http.get<any>(this.API + "/api/activity/viewset/list/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  getstudentassesments(studentid: string) {
    return this.http.get<any>("" + studentid);
  }

  getstudentdetails(username: string) {
    return this.http.get<any>(this.API + "/api/user/profile/student/" + username + "/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });

  }

  updatestudent(param: any) {
    return this.http.put<any>(this.API + "/api/user/profile/student/" + param.username + "/", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  submitactivity(param: any) {
    return this.http.post<any>("", param);
  }

  getquestionsperactivity(activityid: string) {
    //return (object/class)questions[] : list
    return this.http.get<any>(this.API + "/api/question/list/" + activityid + "/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }


  forgotpassword(email: string) {
    let url = "https://al-online.herokuapp.com/faculty/home/profile";
    return this.http.post<any>("/api/auth/request-reset-email", { email: email, redirect_url: url });
  }


  changepassword(param) {
    return this.http.post<any>(this.API + "/api/change-password/", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }


  getprofactivity() {
    return this.http.get<any>(this.API + "/api/activity/viewset/prof_activity/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }


  setprofactivity(param) {
    return this.http.post<any>(this.API + "/api/activity/viewset/prof_activity/", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }


  editprofactivity(param) {
    return this.http.put<any>(this.API + "/api/activity/viewset/prof_activity/", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }


  savefeedback(param) {
    return this.http.post<any>(this.API + "/api/chapter/feedback/chapter1.txt", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  getfeedback(chapter) {
    return this.http.get<any>(this.API + "/api/chapter/feedback/" + chapter, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }



  getallstudents(section) {
    return this.http.get<any>(this.API + "/api/section/students/" + section + "/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

}
