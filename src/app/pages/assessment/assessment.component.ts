import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Activity } from 'src/app/classes/activity';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  constructor(private service: ApiService,
  ) { }

  act: Activity;
  questions: any;

  ngOnInit(): void {
    this.getquestions();
  }


  getquestions() {
    /* this.service.getquestionsperactivity(this.act.id).subscribe(res => {
       this.questions = res;
     }, err => {
       //toast error message
     });*/
  }

}
