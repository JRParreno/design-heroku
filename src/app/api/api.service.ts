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

  getsectionlistperprof(profid: any) {
    return this.http.get<any>(this.API + "/api/section/viewset/list/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  savesection(param: any) {
    return this.http.post<any>(this.API + "/api/section/viewset/list/", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }


  getsection(id: any) {
    return this.http.get<any>(this.API + "/api/section/viewset/list/" + id, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  getstudentspersection(sectionid: any) {
    return this.http.get<any>("" + sectionid);
  }

  savestudent(param: any, sectionid) {
    console.log(param);
    return this.http.post<any>(this.API + "/api/section/students/" + sectionid, param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
    //return this.http.post<any>(this.API + "/api/auth/student/register/", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  getactivity(activityid) {

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
    return this.http.get<any>("" + activityid);
  }


  forgotpassword(email: string) {
    let url = "https://al-online.herokuapp.com/faculty/home/profile";
    return this.http.post<any>("/api/auth/request-reset-email", { email: email, redirect_url: url });
  }


  changepassword(param) {
    return this.http.post<any>(this.API + "/api/change-password/", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

}
