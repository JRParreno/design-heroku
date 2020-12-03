import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Activity } from 'src/app/classes/activity';
import { Block } from 'src/app/classes/block';

@Component({
  selector: 'app-filechecking',
  templateUrl: './filechecking.component.html',
  styleUrls: ['./filechecking.component.css']
})
export class FilecheckingComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ApiService,
  ) { }

  list: any[] = [1, 2, 3, 4, 5, 6, 7, 8];

  sections: Block[];
  activities: Activity[];
  acttype: any[];
  acttypeslc: any;
  activityslc: any;
  sectionslc: any;

  sectiondesc: any;
  activitydesc: any;

  resmessage: string;
  works: any[];

  ngOnInit(): void {
    this.resmessage = '';
    this.sectiondesc = '';
    this.activitydesc = '';
    this.sectionslc = 'Section';
    this.acttypeslc = 'Activity Type';
    this.activityslc = 'Activity';
    this.getactivitytype();
    this.getsections();
  }


  getactivitytype() {
    this.acttype = [];
    this.acttypeslc = 'Activity Type';
    this.service.getactivitytype().subscribe(res => {
      this.acttype = res;
    }, err => {
      console.log(err);
    });
  }

  getsections() {
    this.service.getsectionlistperprof().subscribe(res => {
      this.sections = res;
      this.sections = this.sections.filter(s => s.user == sessionStorage.getItem('userid'));
    }, err => {
      console.log(err);
    });
  }

  getactivity() {
    this.activities = [];
    if (this.acttypeslc != 'Activity Type') {
      this.service.listactivity(this.acttypeslc).subscribe(res => {
        this.activities = res;
      }, err => {
        console.log(err);
      });
    }
  }


  getsubmission() {
    this.works = [];
    if (this.activityslc != 'Activity' && this.sectionslc != 'Activity') {
      this.sectiondesc = this.sections.find(s => { return s.id == this.sectionslc; }).code;
      this.activitydesc = this.activities.find(s => { return s.id == this.activityslc; }).activity_name;
      this.service.getpassedwork(this.sectionslc, this.activityslc).subscribe(res => {
        this.works = res;
        this.works.forEach(w => {
          if (w.submitsummary != undefined && w.submitsummary.length > 0) {
            w.submitsummary.forEach(element => {
              console.log(element);
              element.grade = null;
              if (element.points != null && element.points != 0) {
                element.student_id = w.student_id;
                element.grade = element.points;
                element.graded = true;
              } else {
                element.graded = false;
              }
            });
          }
        });
        console.log(this.works);
      }, err => {
        console.log(err);
      });
    }
  }


  savegrade(row, i) {
    let submit: any[] = [];
    let param: any = {};
    param.question = row.question;
    param.q_type = row.q_type;
    param.assesment = { "score": + row.grade };
    submit.push(param);
    //console.log(submit);
    this.service.encodegrade(submit, this.activityslc, i.student_id).subscribe(res => {
      this.getsubmission();
      this.resmessage = "Activity grade recorded!";
      let c = document.getElementById('closereg');
      c.click();
    }, err => {
      console.log(err);
      this.resmessage = "Invalid routine!";
      let c = document.getElementById('closereg');
      c.click();
    });
  }


  test(i) {
    console.log(i);
  }

  openfile(i) {
    window.open(i.code_file);
  }
}
