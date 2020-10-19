import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facultylogin',
  templateUrl: './facultylogin.component.html',
  styleUrls: ['./facultylogin.component.css']
})
export class FacultyloginComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(["/faculty/home"]);
  }

}
