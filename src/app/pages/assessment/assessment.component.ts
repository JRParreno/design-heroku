import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Activity } from 'src/app/classes/activity';
import { Question } from 'src/app/classes/question';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ApiService,
    private activatedRoute: ActivatedRoute,
  ) { }

  act: Activity;
  questions: any[];
  questions2: any[];
  activityid: any;
  answers: any[];

  fileToUpload: File = null;

  ngOnInit(): void {
    this.fileToUpload = null;
    this.questions = [];
    this.answers = [];
    this.act = new Activity;
    this.activatedRoute.paramMap.subscribe(param => {
      if (param.get('id') != sessionStorage.getItem('tempactivity')) {
        this.router.navigate(["/student/home/activity"]);
      } else {
        this.getquestions(param.get('id'));
        this.activityid = param.get('id');
      }
    });
  }

  getactivity(id) {
    this.service.getactivity(id).subscribe(res => {
      this.act = res;
    }, err => {
      console.log(err);
    });
  }

  handleFileInput(files: FileList, question) {
    this.fileToUpload = files.item(0);
    /*let s = new Submission;
    s.question = 1;
    s.student = 13;
    s.table_image = this.fileToUpload;*/
    question.table_filename = this.fileToUpload;
    const f: FormData = new FormData();
    f.append('table_image', this.fileToUpload, this.fileToUpload.name);
    /*f.append('question', s.question);
    f.append('student', s.student);*/
    /*this.service.submitactivity(f, 1).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });*/
  }



  getquestions(activityid) {
    this.service.getquestionsperactivity(activityid).subscribe(res => {
      this.questions = res;
      this.questions2 = res;
      this.questions.forEach(q => {
        if (q.q_type == "IDENT") {
          q.answer = '';
        }
      });
      this.questions.sort((a, b) => (a.number > b.number) ? 1 : -1);
      this.getsubmittedanswers(activityid);
    }, err => {
      console.log(err);
    });
  }


  getsubmittedanswers(activityid) {
    this.service.getsubmitted(activityid).subscribe(res => {
      this.answers = res;
      console.log(this.answers);
      this.answers.forEach(a => {
        this.questions.forEach(q => {
          if (q.id == a.question) {
            this.questions.splice(this.questions.indexOf(q), 1);
          }
        });
      });
    }, err => {
      console.log(err);
    });
  }


  removefile(question) {
    if (question.table_filename != undefined && question.table_filename != null && question.table_filename != '') {
      question.table_filename = null;
    }
  }

  submit(question) {
    const formdata: FormData = new FormData();
    formdata.append('question', question.id);
    formdata.append('student', sessionStorage.getItem('userid'));
    if (question.q_type == "CODE") {
      formdata.append('table_filename', question.table_filename, question.table_filename.name);
    }
    if (question.q_type == "IDENT") {
      formdata.append('answer', question.answer);
    }
    this.service.submitactivity(formdata, this.activityid).subscribe(res => {
      this.getquestions(this.activityid);
      //toast submitted answer
    }, err => {
      console.log(err);
    });
  }

}



export class Submission {
  question;
  student;
  answer;
  table_image: File;
  code_file: File;
}