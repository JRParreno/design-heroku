import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Activity } from 'src/app/classes/activity';
import { Question } from 'src/app/classes/question';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  constructor(private service: ApiService,
  ) { }

  act: Activity;
  questions: Question[];
  questions2: Question[];

  fileToUpload: File = null;

  ngOnInit(): void {
    this.fileToUpload = null;
    this.questions = [];
    this.act = new Activity;
    this.getactivity();
  }

  getactivity() {
    this.service.getactivity(1).subscribe(res => {
      this.act = res;
      this.getquestions();
    }, err => {
      console.log(err);
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }


  getquestions() {
    this.service.getquestionsperactivity(this.act.id).subscribe(res => {
      this.questions = res;
      this.questions2 = res;
      this.questions.forEach(q => {
        if (q.q_type == "IDENT") {
          q.answer = '';
        }
      });
    }, err => {
      console.log(err);
      //toast error message
    });
  }

  submit() {
    let param: any[] = [];
    this.questions.forEach(q => {
      param.push({ question: q.number, answer: q.answer });
    });
    console.log(param);
    this.service.submitactivity(param, this.act.id).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}