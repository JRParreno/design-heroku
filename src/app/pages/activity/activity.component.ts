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

  ngOnInit(): void {
    this.blocks = [];
    this.studentactivity = [];
    this.sectionid = sessionStorage.getItem('section');
    this.getactivity();
  }


  getactivity() {
    this.service.getprofactivity().subscribe(res => {
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
    });
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
      let section = this.blocks.find(i => i.id == this.sectionid);
      console.log(section);
    }, err => {
      console.log(err);
    });
  }


  getactivities() {
    this.service.listactivity().subscribe(res => {
      this.activity = res;
      this.getactivity();
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