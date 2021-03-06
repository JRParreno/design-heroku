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

  listactivity(type) {
    return this.http.get<any>(this.API + "/api/activity/viewset/" + type + "/list/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
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

  submitactivity(param: FormData, id) {
    return this.http.post<any>(this.API + "/api/student/submit/" + id + "/", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  getquestionsperactivity(activityid: string) {
    return this.http.get<any>(this.API + "/api/question/list/" + activityid + "/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }


  forgotpassword(email: string) {
    let url = "https://" + window.location.hostname + "/resetpassword";
    return this.http.post<any>(this.API + "/api/auth/request-reset-email/", { email: email, redirect_url: url });
  }

  submitresetpassword(param) {
    return this.http.patch<any>(this.API + "/api/auth/password-reset-complete/", param);
  }

  getactivitytype() {
    return this.http.get<any>(this.API + "/api/activity/type/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }


  changepassword(param) {
    return this.http.put<any>(this.API + "/api/auth/change-password/", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  getprofactivity(type) {
    // return this.http.get<any>(this.API + "/api/activity/viewset/"+activitytype+"prof_activity/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
    return this.http.get<any>(this.API + "/api/activity/viewset/" + type + "/prof_activity/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  getstudentactivitysched(type) {
    return this.http.get<any>(this.API + "/api/activity/student/" + type, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  getprofactivityperid(type, id) {
    return this.http.get<any>(this.API + "/api/activity/viewset/" + type + "/" + id + "/prof_activity/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  setprofactivity(param, type) {
    return this.http.post<any>(this.API + "/api/activity/viewset/" + type + "/prof_activity/", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  editprofactivity(param) {
    return this.http.put<any>(this.API + "/api/activity/viewset/prof_activity/", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  savefeedback(param, id) {
    return this.http.post<any>(this.API + "/api/chapter/feedback/" + id + "/", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  getfeedback(chapter) {
    return this.http.get<any>(this.API + "/api/chapter/feedback/" + chapter, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  getallstudents(section) {
    return this.http.get<any>(this.API + "/api/section/students/" + section + "/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  requestrestemail(param) {
    return this.http.post<any>(this.API + "/api/request-reset-email/", param);
  }

  listchapters(id) {
    if (id != null) {
      return this.http.get<any>(this.API + "/api/chapter/viewset/list/" + id + "/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
    } else {
      return this.http.get<any>(this.API + "/api/chapter/viewset/list/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
    }
  }

  getsubmitted(studentid, activityid) {
    return this.http.get<any>(this.API + "/api/student/update/" + studentid + "/" + activityid + "/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  getpassedwork(sectionid, activityid) {
    return this.http.get<any>(this.API + "/api/student/summary/" + sectionid + "/" + activityid + "/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  encodegrade(param, activityid, studentid) {
    return this.http.post<any>(this.API + "/api/student/update/" + studentid + "/" + activityid + "/", param, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

  getrecords(sectionid) {
    if (sectionid != null) {
      return this.http.get<any>(this.API + "/api/assesment/list/filter/" + sectionid + "/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
    } else {
      return this.http.get<any>(this.API + "/api/assesment/list/", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
    }
  }

  getstudentgrades() {
    return this.http.get<any>(this.API + "/api/assesment/activity", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access') } });
  }

}
