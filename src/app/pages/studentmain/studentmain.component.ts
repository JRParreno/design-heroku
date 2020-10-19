import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentmain',
  templateUrl: './studentmain.component.html',
  styleUrls: ['./studentmain.component.css']
})
export class StudentmainComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    // let header = document.getElementById("header");

    // Get the offset position of the navbar
    // var sticky = header.offsetTop;
    // if (window.pageYOffset > sticky) {
    //   header.classList.add("nav-shadow");
    //  } else {
    //   header.classList.remove("nav-shadow");
    // }
  }


}
