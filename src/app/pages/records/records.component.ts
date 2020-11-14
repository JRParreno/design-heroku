import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Activity } from 'src/app/classes/activity';
import { Block } from 'src/app/classes/block';
import { Student } from 'src/app/classes/student';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ApiService
  ) { }

  list: any[] = [1, 2, 3, 4, 5, 6, 7];
  studentlist: Student[];
  student: Student;

  blocks: Block[];
  activity: Activity[];

  ngOnInit(): void {
    this.studentlist = [];
    this.blocks = [];
    this.activity = [];
    this.getsections();
    this.getactivity();
  }

  goto(path: string) {
    this.router.navigate([path]);
  }


  getactivity() {
    this.service.listactivity().subscribe(res => {
      this.activity = res;
    }, err => { });

  }


  getallstudents(id) {
    this.service.getallstudents(id).subscribe(res => {
      if (res.length != 0) {
        let sts: Student[] = res;
        sts.forEach(s => {
          s.section = this.blocks.find(b => b.id == id).code;
        });
        this.studentlist.push(...sts);
      }
    }, err => {
      console.log(err);
    });
  }


  getsections() {
    this.service.getsectionlistperprof(sessionStorage.getItem('username')).subscribe(res => {
      this.blocks = res;
      this.blocks.forEach(i => {
        this.getallstudents(i.id);
      });
      console.log(this.studentlist);
    }, err => {
      console.log(err);
      //toast error
    });
  }
}
