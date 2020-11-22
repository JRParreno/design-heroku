import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Activity } from 'src/app/classes/activity';
import { Block } from 'src/app/classes/block';
import { Choices } from 'src/app/classes/choices';
import { Question } from 'src/app/classes/question';
import { Studentanswer } from 'src/app/classes/studentanswer';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor(
    private service: ApiService,
    private router: Router,
  ) { }

  questions: Question[];
  activity: Activity;
  choices: Choices[];
  answers: Studentanswer[];
  list: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];


  blocks: Block[];
  sectionid: any;
  profid: any;

  studentactivity: stactivity[];
  sectionactivity: any[];

  acttype: any[];
  allacts: any[];
  actsslc: any[];

  studentacts: any[];
  schedacts: any[];

  section: Block;

  ngOnInit(): void {
    this.schedacts = [];
    this.studentacts = [];
    this.section = new Block;
    this.blocks = [];
    this.studentactivity = [];
    this.acttype = [];
    this.sectionid = sessionStorage.getItem('section');
    this.getchapters();
    this.getsection();
  }

  getchapters() {
    this.service.listchapters(null).subscribe(res => {
      this.list = res;
      this.list.sort((a, b) => (a.id > b.id) ? 1 : -1);
      this.getactivitytype();
    }, err => {
      console.log(err);
    });
  }


  getactivitytype() {
    this.allacts = [];
    this.service.getactivitytype().subscribe(res => {
      this.acttype = res;
      this.acttype.forEach(i => {
        this.service.getstudentactivitysched(i.id).subscribe(res => {
          this.studentacts = [...this.studentacts, ...res];
        }, err => {
          console.log(err);
        });

        this.service.listactivity(i.id).subscribe(res => {
          this.allacts = [...this.allacts, ...res];
        }, err => {
          console.log(err);
        })
      });
    }, err => {
      console.log(err);
    });
  }


  selectchapter(id) {
    this.schedacts = [];
    this.actsslc = [];
    this.actsslc = this.allacts.filter(i => i.chapter == id);
    if (this.actsslc.length > 0) {
      this.actsslc.forEach(i => {
        let activities = this.studentacts.filter(a => a.chapter == i.chapter && a.activity_name == i.activity_name && a.activity_type == i.activity_type);
        this.schedacts = [...this.schedacts, ...activities];
      });
      this.schedacts.forEach(s => {
        let start = new Date(s.start).setHours(0, 0, 0, 0);
        let end = new Date(s.end).setHours(0, 0, 0, 0);
        let current = new Date().setHours(0, 0, 0, 0);
        if (start <= current && end > current) {
          s.locked = false;
        } else {
          s.locked = true;
        }
      });
    }
  }

  gotoactivity(id, type) {
    sessionStorage.setItem('tempactivity', id);
    let d = document.getElementById('secmodalcls');
    d.click();
    this.router.navigate(["/student/home/assessment/" + type + "/" + id + "/"]);
  }


  getactivity() {
    this.service.listactivity(1).subscribe(res => {
      //console.log(res);
    }, err => {
      console.log(err);
    });
    /*this.service.getprofactivity().subscribe(res => {
      this.sectionactivity = res;
      this.sectionactivity = this.sectionactivity.filter(i => i.section == this.sectionid);
      this.studentactivity = [];
      this.sectionactivity.forEach(a => {
        let ac = new stactivity;
        ac.activity = a.activity;
        ac.activity_name = a.activity_name;
        ac.end = a.end;
        ac.remarks = a.remarks;
        ac.section = a.section;
        ac.section_code = a.section_code;
        ac.start = a.start;
        this.studentactivity.push(ac);
        let start = new Date(ac.start).setHours(0, 0, 0, 0);
        let end = new Date(ac.end).setHours(0, 0, 0, 0);
        let current = new Date().setHours(0, 0, 0, 0);
        if (start <= current && end > current) {
          ac.locked = false;
        } else {
          ac.locked = true;
        }
      });
    }, err => {
      console.log(err);
    });*/
  }

  getsection() {
    this.service.getsection(this.sectionid).subscribe(res => {
      this.profid = res.user;
      this.getsections();
    }, err => {
      console.log(err);
    });
  }


  getsections() {
    this.service.getsectionlistperprof().subscribe(res => {
      this.blocks = res;
      this.section = this.blocks.find(i => i.id == this.sectionid);
    }, err => {
      console.log(err);
    });
  }

}




export class stactivity {
  id;
  activity_name;
  chapter;
  score;
  student_number;
  start;
  activity;
  end;
  section;
  section_code;
  remarks;
  locked;
}