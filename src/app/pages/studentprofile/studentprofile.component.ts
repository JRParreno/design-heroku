import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Student } from 'src/app/classes/student';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ApiService,
  ) { }

  changepass: boolean;
  profile: Student;

  oldpassword: string;
  newpassword: string;
  newpassword2: string;

  message: string;

  ngOnInit(): void {
    this.message = '';
    this.oldpassword = '';
    this.newpassword = '';
    this.newpassword2 = '';
    this.profile = new Student;
    this.changepass = false;
    this.getdetails();
  }

  getdetails() {
    this.service.getstudentdetails(sessionStorage.getItem('username')).subscribe(res => {
      this.profile = res;
      this.getsection();
    }, err => {
      console.log(err);
      //toast message here
    });
  }

  getsection() {
    this.service.getsection(sessionStorage.getItem('section')).subscribe(res => {
      this.profile.section = res.code;
    }, err => {
      console.log(err);
    });
  }



  updatedetails() {
    console.log(this.profile);
    /*this.service.updatestudent(this.profile).subscribe(res => {
      //if success toast success message then get updates details
      this.getdetails();
    }, err => {
      //toast error message
    });*/
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

}
