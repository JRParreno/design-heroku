import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Assessment } from 'src/app/classes/assessment';

@Component({
  selector: 'app-assessmentrecord',
  templateUrl: './assessmentrecord.component.html',
  styleUrls: ['./assessmentrecord.component.css']
})
export class AssessmentrecordComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ApiService
  ) { }

  list: any[];
  records: Assessment[];
  activity: any[];


  ngOnInit(): void {
    this.getactivity();
    this.getrecords();
  }

  goto(path: string) {
    this.router.navigate([path]);
  }

  getrecords() {
    this.list = [];
    this.service.getrecords(sessionStorage.getItem('section')).subscribe(res => {
      let block: any[] = res;
      let student = block.find(i => { return i.university_id == sessionStorage.getItem('username'); });
      if (student != undefined) {
        this.list = student.assesment;
        console.log(this.list);
      }
    }, err => {
      console.log(err);
    });
  }


  getactivity() {
    this.activity = [];
    this.service.getactivitytype().subscribe(i => {
      let act: any[] = i;
      act.forEach(a => {
        this.service.listactivity(a.id).subscribe(res => {
          this.activity.push(...res);
        }, err => {
          console.log(err);
        });
      });
    }, err => {
      console.log(err);
    });
  }



  getscore(activity): string {
    let a = this.list.find(i => {
      console.log(i);
      return i.activity == activity.id;
    });
    return "NA";
  }

}
