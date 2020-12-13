import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-studentmain',
  templateUrl: './studentmain.component.html',
  styleUrls: ['./studentmain.component.css']
})
export class StudentmainComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ApiService,
  ) { }

  isnav: boolean;

  ngOnInit(): void {
    this.isnav = true;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    if (window.innerWidth < 1000) {
      let side = document.getElementById("sidenav");
      let main = document.getElementById("routing");
      side.style.width = '0';
      main.style.paddingLeft = '0';
    }
    // let header = document.getElementById("header");

    // Get the offset position of the navbar
    // var sticky = header.offsetTop;
    // if (window.pageYOffset > sticky) {
    //   header.classList.add("nav-shadow");
    //  } else {
    //   header.classList.remove("nav-shadow");
    // }
  }


  getuserdetails() {

  }

  togglenav() {
    let n = document.getElementById('sidenav');
    if (this.isnav) {
      n.style.width = '10em';
      this.isnav = false;
      return;
    } else {
      this.isnav = true;
      n.style.width = '4em';
      return;
    }
  }



  logout() {
    sessionStorage.clear();
    this.router.navigate(['/portal/student']);
  }


  toggleside() {
    let side = document.getElementById("sidenav");
    let main = document.getElementById("routing");
    if (side.style.width == '' || side.style.width == '4em') {
      side.style.width = '0';
      main.style.paddingLeft = '0';
    } else if (side.style.width == '0' || side.style.width == '0px' || side.style.width == '0em') {
      side.style.width = '4em';
      main.style.paddingLeft = '4em';
    } else {

    }
  }


  getsection() {

  }


}
