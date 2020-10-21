import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ApiService,
  ) { }

  faculty: boolean;
  student: boolean;
  navstr: string;
  studentid: string;
  studentpassword: string;
  facultyid: string;
  facultypassword: string;
  profdetails: userprof;

  profpassword2: string;

  message: string;
  prgbtn: boolean;

  ngOnInit(): void {
    this.profpassword2 = '';
    this.prgbtn = true;
    this.message = '';
    this.profdetails = new userprof;
    this.faculty = false;
    this.student = false;
    this.route.params.subscribe(res => {
      this.navstr = res.id;
      if (res.id == "student") {
        this.student = true;
      } else if (res.id == "faculty") {
        this.faculty = true;
      } else {
        this.router.navigate(['/'])
      }
    });
  }


  viewsidenav() {
    let side = document.getElementById("topnav");
    side.style.height = "250px";
    let header = document.getElementById("header");
    header.classList.remove("nav-shadow");
    side.classList.add("nav-shadow");
  }

  closesidenav() {
    let side = document.getElementById("topnav");
    side.style.height = "0";
    side.classList.remove("nav-shadow");
  }


  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    let header = document.getElementById("header");

    // Get the offset position of the navbar
    var sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
      header.classList.add("nav-shadow");
    } else {
      header.classList.remove("nav-shadow");
    }
    this.closesidenav();
  }


  scrollto(id) {
    let element = document.getElementById(id);
    element.scrollIntoView();
  }

  loginStudent() {
    let param = { username: this.studentid, password: this.studentpassword };
    this.router.navigate(["/student/home"]);
    /*this.service.loginstudent(null).subscribe(res => {
      //success login navigate main page (set session data)
      this.router.navigate(["/student/home"]);
    }, err => {
      //error toast message
    });*/
    //this.router.navigate(["/student/home"]);
  }

  loginProfessor() {
    let param = { "username": this.facultyid, "password": this.facultypassword };
    this.router.navigate(["/faculty/home"]);
    /*this.service.loginprofessor(param).subscribe(res => {
      //console.log(res);
      if (res.user.username == this.facultyid) {
        sessionStorage.setItem('username', res.user.username);
        sessionStorage.setItem('access', res.token.access);
        sessionStorage.setItem('refresh', res.token.refresh);
        this.router.navigate(["/faculty/home"]);
      }
      //success login navigate main page (set session data)
    }, err => {
      //error toast message
      this.message = '';
      if (err.error.detail != undefined) {
        this.message = this.message + err.error.detail + '.';
        let c = document.getElementById('closereg');
        c.click();
      }
    });*/
  }

  registerProfessor() {
    this.profdetails.professor = this.profdetails.username;
    this.profdetails.last_name = this.profdetails.first_name;
    this.service.createprofessor(this.profdetails).subscribe(res => {
      if (res.professor != undefined && res.professor != null && res.professor == this.profdetails.professor) {
        this.message = 'New User Registration Success!';
        let c = document.getElementById('closereg');
        c.click();
      }
      //success close modal toast message
    }, err => {
      this.message = '';
      if (err.error.username != undefined) {
        this.message = this.message + err.error.username[0] + ' ';
      }
      if (err.error.password != undefined) {
        this.message = this.message + err.error.password[0] + ' ';
      }
      if (err.error.email != undefined) {
        this.message = this.message + err.error.email[0] + ' ';
      }
      if (err.error.first_name != undefined) {
        this.message = this.message + err.error.first_name[0] + ' ';
      }
      if (err.error.last_name != undefined) {
        this.message = this.message + err.error.username[0] + ' ';
      }
      let c = document.getElementById('closereg');
      c.click();
      //error toast message
    });
  }

}


export class userprof {
  professor;
  password;
  email;
  first_name;
  last_name;
  username;
}

export class prof {
  faculty_id;
}

