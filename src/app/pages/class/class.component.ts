import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stderr } from 'process';
import { ApiService } from 'src/app/api/api.service';
import { Student } from 'src/app/classes/student';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  list: any[] = [1, 2, 3, 4, 5, 6, 7];
  studentlist: Student[];
  student: Student;
  message: string;

  sectionid: any;

  ngOnInit(): void {
    this.message = '';
    this.student = new Student;
    this.activatedRoute.paramMap.subscribe(param => {
      this.sectionid = param.get('id');
    });
    //this.getstudents();
  }

  getstudents() {
    this.service.getstudentspersection(this.sectionid).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
      //toast error message
    });
  }

  newstudent() {
    this.student = new Student;
  }

  addstudent() {
    const chars = this.student.username.split('-');
    let pass = chars[0].substring(2, 4) + chars[1];
    this.student.password = pass;
    this.service.savestudent(this.student, this.sectionid).subscribe(res => {
      if (res.username == this.student.username) {
        //success
        this.getstudents();
        let c = document.getElementById('closereg');
        c.click();
      }
    }, err => {
      this.message = '';
      if (err.error.username != undefined) {
        this.message = this.message + err.error.username[0] + ' ';
      } else if (err.error.password != undefined) {
        this.message = this.message + err.error.password[0] + ' ';
      } else if (err.error.email != undefined) {
        this.message = this.message + err.error.email[0] + ' ';
      } else if (err.error.first_name != undefined) {
        this.message = this.message + err.error.first_name[0] + ' ';
      } else if (err.error.last_name != undefined) {
        this.message = this.message + err.error.username[0] + ' ';
      }

      if (this.message == '') {
        this.message = "Invalid routine";
      }

      let c = document.getElementById('closereg');
      c.click();
      //error toast message
    });
  }

  addallstudent() {

  }


  goto(path: string) {
    this.router.navigate([path]);
  }

}
