import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stderr } from 'process';
import { ApiService } from 'src/app/api/api.service';
import { Block } from 'src/app/classes/block';
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

  list: Student[];
  studentlist: Student[];
  student: Student;
  message: string;
  block: Block;
  sectionid: any;
  studentslc: Student;

  studentdelete: Student[];

  ngOnInit(): void {
    this.studentdelete = [];
    this.block = new Block;
    this.message = '';
    this.student = new Student;
    this.studentslc = new Student;
    this.activatedRoute.paramMap.subscribe(param => {
      this.sectionid = param.get('id');
      this.getsection();
    });
    //this.getstudents();
  }


  getsection() {
    this.service.getsection(this.sectionid).subscribe(res => {
      if (res != undefined && res != null) {
        this.block = res;
        this.getstudents();
      }
    }, err => {
      console.log(err);
    });
  }

  getstudents() {
    this.service.getstudentspersection(this.sectionid).subscribe(res => {
      this.studentdelete = [];
      this.list = res;
    }, err => {
      console.log(err);
      //toast error message
    });
  }

  viewstudent(student) {
    this.studentslc = student;
  }

  newstudent() {
    this.student = new Student;
  }

  addstudent() {
    const chars = this.student.username.split('-');
    let pass = chars[0].substring(2, 4) + chars[1];
    //this.student.password = pass;
    this.service.savestudent(this.student, this.sectionid).subscribe(res => {
      if (res.username == this.student.username) {
        //success
        this.getstudents();
        this.message = "New Student saved!";
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

  validate(id: any, char) {
    let d = <HTMLInputElement>document.getElementById(id);

    if (d.value == null || d.value == '') {
      d.classList.add('is-invalid');
    } else if (char != null && d.value.length < char) {
      d.classList.add('is-invalid');
    } else {
      if (d.classList.contains('is-invalid')) {
        d.classList.remove('is-invalid');

      }
    }
  }



  selectStudent(event, student: Student) {
    let checked = event.target.checked;
    if (checked) {
      let s = this.studentdelete.find(i => i.student_number == student.student_number);
      if (s == undefined) {
        this.studentdelete.push(student);
      }
    } else {
      this.studentdelete = this.studentdelete.filter(i => i.student_number != student.student_number);
    }
  }

}
