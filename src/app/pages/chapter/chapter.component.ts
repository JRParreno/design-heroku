import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: ApiService,
  ) { }

  list: any[];
  vids: any[] = [1, 2, 3, 4];


  chapterid: string;
  url: string;
  notes: string;

  chaptername: string;
  feedback: string;

  ngOnInit(): void {
    this.feedback = '';
    this.url = 'Reference link will appear here if your instructor provides one';
    this.notes = 'Notes from your instructor will appear here if he/she provides one';
    this.list = [];
    this.activatedRoute.paramMap.subscribe(param => {
      this.chapterid = param.get('id');
      this.getchapter();
      this.getfeedback(this.chapterid);
      this.listchapter(this.chapterid);
    });
  }


  listchapter(id) {
    this.service.listchapters(id).subscribe(res => {
      this.chaptername = res.filename;
    }, err => {
      console.log(err);
    });
  }


  getchapter() {
    let lecture = document.getElementById('lecture');
    this.http.get('/assets/chapters/CHAPTER' + this.chapterid + '/lecture' + this.chapterid + '.html', { responseType: "text" }).subscribe(res => {
      lecture.innerHTML = res;
    })
  }

  goto(path) {
    this.router.navigate([path]);
  }

  savefeedback() {
    let param = { username: sessionStorage.getItem('username'), date_posted: new Date(), student_chapter: this.chapterid, feedback: this.feedback, user: sessionStorage.getItem('userid') };
    this.service.savefeedback(param, this.chapterid).subscribe(res => {
      if (res != undefined) {
        //toast post success
        this.getfeedback(this.chapterid);
      }
    }, err => {
      console.log(err);
    });
  }

  getfeedback(id) {
    this.service.getfeedback(id).subscribe(res => {
      this.list = res;
    }, err => {
      console.log(err);
    });
  }

}
