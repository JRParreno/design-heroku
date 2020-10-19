import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from 'src/app/classes/professor';

@Component({
  selector: 'app-facultyprofile',
  templateUrl: './facultyprofile.component.html',
  styleUrls: ['./facultyprofile.component.css']
})
export class FacultyprofileComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  changepass: boolean;
  profile: Professor;

  ngOnInit(): void {
    this.changepass = false;
  }

  goto(path: string) {
    this.router.navigate([path]);
  }

  togglechangepass() {
    if (this.changepass) {
      this.changepass = false;
    } else {
      this.changepass = true;
    }
  }

}
