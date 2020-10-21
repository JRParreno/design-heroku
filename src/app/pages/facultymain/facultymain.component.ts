import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-facultymain',
  templateUrl: './facultymain.component.html',
  styleUrls: ['./facultymain.component.css']
})
export class FacultymainComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ApiService,
  ) { }

  ngOnInit(): void {
    //this.getuser();
  }


  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    let target: any = event.target || event.srcElement || event.currentTarget;
    if (target.id != 'viewmenu') {
      this.closesidenav();
    }
  }

  getuser() {
    this.service.getprofessor(sessionStorage.getItem('username')).subscribe(res => {
    }, err => {
    });
  }


  navigate(path: string) {
    this.router.navigate([path]);
    //this.router.navigate(["/login"]);
  }


  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    let header = document.getElementById("header");
    // Get the offset position of the navbar
    let sticky = header.offsetTop;
    //console.log(window.pageYOffset > sticky);
    if (window.pageYOffset > sticky) {
      header.classList.add("nav-shadow");
    } else {
      header.classList.remove("nav-shadow");
    }
    this.closesidenav();
  }


  logout() {
    sessionStorage.clear();
    this.router.navigate(['/portal/faculty']);
  }


  goto(path) {
    this.closesidenav();
    this.router.navigate([path]);
  }


  viewsidenav() {
    let side = document.getElementById("sidenavs");
    side.style.height = "300px";
    let header = document.getElementById("header");
    header.classList.remove("nav-shadow");
    side.classList.add("nav-shadow");

  }

  closesidenav() {
    let side = document.getElementById("sidenavs");
    side.style.height = "0";
    side.classList.remove("nav-shadow");
  }

}
