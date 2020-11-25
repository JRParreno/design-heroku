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


  oldpassword: string;
  newpassword: string;
  newpassword2: string;

  message: string;


  ngOnInit(): void {
    this.message = '';
    this.oldpassword = '';
    this.newpassword = '';
    this.newpassword2 = '';
    this.profile = new Professor;
    this.changepass = true;
    this.getuser();
  }

  goto(path: string) {
    this.router.navigate([path]);
  }

  getuser() {
    this.service.getprofessor(sessionStorage.getItem('username')).subscribe(res => {
      this.profile = res;
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

  changepassword() {
    let param: any = { "old_password": this.oldpassword, "new_password": this.newpassword };
    this.service.changepassword(param).subscribe(res => {
      if (res.status == "success") {
        this.message = res.message;
        let c = document.getElementById('closereg');
        c.click();
      }
    }, err => {
      this.message = "Invalid routine!";
      let c = document.getElementById('closereg');
      c.click();
      console.log(err);
    });
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
