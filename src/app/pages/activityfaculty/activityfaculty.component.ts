import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Activity } from 'src/app/classes/activity';
import { Choices } from 'src/app/classes/choices';
import { Question } from 'src/app/classes/question';

@Component({
  selector: 'app-activityfaculty',
  templateUrl: './activityfaculty.component.html',
  styleUrls: ['./activityfaculty.component.css']
})
export class ActivityfacultyComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: ApiService,
  ) { }

  questions: Question[];
  activity: Activity;
  choices: Choices[];
  list: any[] = [1, 2, 3, 4];
  activityid: any;
  activitytype: any;

  ngOnInit(): void {
    this.activity = new Activity;
    this.activatedRoute.paramMap.subscribe(param => {
      this.activityid = param.get('id');
      this.activitytype = param.get('type');
      console.log(this.activitytype);
      this.getactivity();
      this.getquestions();
    });
  }

  goto(path: string) {
    this.router.navigate([path]);
  }


  getquestions() {
    this.service.getquestionsperactivity(this.activityid).subscribe(res => {
      console.log(res);
      this.questions = res;
      console.log(this.questions);
    }, err => { });
  }


  getactivity() {
    this.service.getactivity(this.activityid).subscribe(res => {
      this.activity = res;
    }, err => { });
  }

}
