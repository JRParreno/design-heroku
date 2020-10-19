import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Assessment } from 'src/app/classes/assessment';

@Component({
  selector: 'app-assessmentrecord',
  templateUrl: './assessmentrecord.component.html',
  styleUrls: ['./assessmentrecord.component.css']
})
export class AssessmentrecordComponent implements OnInit {

  constructor(
    private service: ApiService,
  ) { }

  list: any[] = [1, 2, 3, 4, 5, 6, 7];
  records: Assessment[];


  ngOnInit(): void {
    this.getrecords();
  }

  getrecords() {
    /*this.service.getstudentassesments(sessionStorage.getItem('studentid')).subscribe(res => {
      this.records = res;
    }, err => {
      //toast error message
    });*/
  }

}
