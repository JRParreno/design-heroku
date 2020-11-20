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
  studentlist2: Student[];
  student: Student;

  blocks: Block[];
  activity: Activity[];
  activity2: Activity[];

  sectionslc: any;
  activityslc: any;

  ngOnInit(): void {
    this.activityslc = 'Activity';
    this.sectionslc = 'Section';
    this.studentlist = [];
    this.studentlist2 = [];
    this.blocks = [];
    this.activity = [];
    this.activity2 = [];
    this.getsections();
    this.getactivity(1);//lecture
    //this.getactivity(2);//laboratory
  }

  goto(path: string) {
    this.router.navigate([path]);
  }


  getactivity(type) {
    this.service.listactivity(type).subscribe(res => {
      this.activity = res;
      this.activity2 = res;
    }, err => {
      console.log(err);
    });

  }


  getallstudents(id) {
    this.service.getallstudents(id).subscribe(res => {
      if (res.length != 0) {
        let sts: Student[] = res;
        sts.forEach(s => {
          s.section = this.blocks.find(b => b.id == id).code;
        });
        this.studentlist.push(...sts);
        this.studentlist2.push(...sts);
      }
    }, err => {
      console.log(err);
    });
  }


  getsections() {
    this.service.getsectionlistperprof().subscribe(res => {
      this.blocks = res;
      this.blocks = this.blocks.filter(s => s.user == sessionStorage.getItem('userid'));
      this.blocks.forEach(i => {
        this.getallstudents(i.id);
      });
    }, err => {
      console.log(err);
      //toast error
    });
  }



  bysection() {
    if (this.sectionslc == 'Section') {
      this.studentlist = this.studentlist2;
    } else {
      this.studentlist = this.studentlist2.filter(i => i.section == this.sectionslc);
    }
  }


  byactivity() {
    if (this.activityslc == 'Activity') {
      this.activity = this.activity2;
    } else {
      this.activity = this.activity2.filter(i => i.id == this.activityslc);
    }
  }
}
