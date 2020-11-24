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
  studentlist: any[];
  studentlist2: any[];
  student: Student;

  blocks: Block[];
  activity: Activity[];
  activity2: Activity[];

  acttype: any[];

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
    this.getactivitytype();
  }

  goto(path: string) {
    this.router.navigate([path]);
  }

  getactivitytype() {
    this.acttype = [];
    this.service.getactivitytype().subscribe(res => {
      this.acttype = res;
      this.activity = [];
      this.activity2 = [];
      this.acttype.forEach(i => {
        this.getactivity(i.id);
      });
    }, err => {
      console.log(err);
    });
  }


  getactivity(type) {
    this.service.listactivity(type).subscribe(res => {
      this.activity.push(...res);
      this.activity2.push(...res);
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
    }, err => {
      console.log(err);
      //toast error
    });
  }



  bysection() {
    if (this.sectionslc == 'Section') {
      this.studentlist = [];
    } else {
      this.getrecords(this.sectionslc);
    }
  }


  byactivity() {
    if (this.activityslc == 'Activity') {
      this.activity = this.activity2;
    } else {
      this.activity = this.activity2.filter(i => i.id == this.activityslc);
      /*this.activity.forEach(a => {
        let printjson: any[] = this.studentlist;
        printjson.forEach(s => {
          if (s.assesment != undefined) {
            let ac = s.assesment.find(i => i.activity == a.id);
            if (ac != undefined) {
              s.activity = ac.activity;
              s.score = ac.score;
              s.date_taken = ac.date_taken;
              delete s["assesment"];
            }
          }
        });
        console.log(printjson);
      });*/
    }
  }


  getrecords(sectionid) {
    this.service.getrecords(sectionid).subscribe(res => {
      this.studentlist = res;
      this.studentlist2 = res;
    }, err => {
      console.log(err);
    });
  }

  getgrade(id, student): string {
    let acs: any[] = student.assesment;
    if (acs != undefined && acs.length > 0) {
      let a = acs.find(a => { return a.activity == id });
      if (a != undefined) {
        return a.score;
      } else {
        return "NA";
      }
    } else {
      return "NA";
    };
  }
}
