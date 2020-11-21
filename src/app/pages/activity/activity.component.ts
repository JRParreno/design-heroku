import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
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

  section: Block;

  ngOnInit(): void {
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
    this.actsslc = this.allacts.filter(i => i.chapter == id);
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