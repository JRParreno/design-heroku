import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Professor } from 'src/app/classes/professor';

@Component({
  selector: 'app-facultyprofile',
  templateUrl: './facultyprofile.component.html',
  styleUrls: ['./facultyprofile.component.css']
})
export class FacultyprofileComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ApiService,
  ) { }

  changepass: boolean;
  profile: Professor;

  ngOnInit(): void {
    this.profile = new Professor;
    this.changepass = false;
    this.getuser();
  }

  goto(path: string) {
    this.router.navigate([path]);
  }

  getuser() {
    this.service.getprofessor(sessionStorage.getItem('username')).subscribe(res => {
      this.profile = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  togglechangepass() {
    if (this.changepass) {
      this.changepass = false;
    } else {
      this.changepass = true;
    }
  }

  updatedetails() {
    console.log(this.profile);
    /*this.service.updatestudent(this.profile).subscribe(res => {
      //if success toast success message then get updates details
      this.getuser();
    }, err => {
      //toast error message
    });*/
  }

}
