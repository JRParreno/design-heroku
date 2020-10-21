import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    private service: ApiService
  ) { }

  list: any[] = [1, 2, 3, 4, 5, 6, 7];
  studentlist: Student[];
  student: Student;
  sectionid: string;

  ngOnInit(): void {
    this.getstudents();
  }

  getstudents() {
    /*this.service.getstudentspersection(this.sectionid).subscribe(res => {
      this.studentlist = res;
    }, err => {
      //toast error message
    });*/
  }

  addstudent() {
    /*this.service.savestudent(this.student).subscribe(res => {
      //close modal is success, 
      this.getstudents();
    }, err => {
      //toast error message
    });*/
  }

  addallstudent() {

  }


  goto(path: string) {
    this.router.navigate([path]);
  }

}
