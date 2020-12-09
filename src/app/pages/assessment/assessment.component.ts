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
  message: string;
  notdone: boolean;

  ngOnInit(): void {
    this.notdone = true;
    this.message = '';
    this.fileToUpload = null;
    this.questions = [];
    this.answers = [];
    this.act = new Activity;
    this.activatedRoute.paramMap.subscribe(param => {
      if (param.get('id') != sessionStorage.getItem('tempactivity')) {
        this.router.navigate(["/student/home/activity"]);
      } else {
        this.getquestions(param.get('id'));
        this.getactivity(param.get('id'));
        this.activityid = param.get('id');
        if (param.get('type') == 'Lecture') {
          this.getactivity(1);
        }
        if (param.get('type') == 'Laboratory') {
          this.getactivity(2);
        }
      }
    });
  }

  getactivity(type) {
    this.service.listactivity(type).subscribe(res => {
      let r: any[] = res;
      let a = r.find(i => { return i.id == this.activityid; });
      if (a != undefined) {
        this.act = a;
      }
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
    this.service.getsubmitted(sessionStorage.getItem('userid'), activityid).subscribe(res => {
      this.answers = res;
      this.answers.forEach(a => {
        this.questions.forEach(q => {
          if (q.id == a.question) {
            this.questions.splice(this.questions.indexOf(q), 1);
          }
        });
        if (this.questions.length < 1) {
          this.notdone = false;
          this.message = "Activity Done!";
          let c = document.getElementById('closereg');
          c.click();
        }
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
      formdata.append('code_file', question.table_filename, question.table_filename.name);
    }
    if (question.q_type == "IDENT") {
      formdata.append('answer', question.answer);
    }
    this.service.submitactivity(formdata, this.activityid).subscribe(res => {
      this.getquestions(this.activityid);
      this.message = "Submitted!";
      let c = document.getElementById('closereg');
      c.click();
    }, err => {
      console.log(err);
      this.message = "Invalid routine!";
      let c = document.getElementById('closereg');
      c.click();
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