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

  ngOnInit(): void {
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
    if (this.activityslc != 'Activity') {
      this.service.getsubmitted(this.activityslc).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
    }
  }
}
