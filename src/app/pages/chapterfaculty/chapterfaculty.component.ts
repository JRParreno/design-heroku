import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-chapterfaculty',
  templateUrl: './chapterfaculty.component.html',
  styleUrls: ['./chapterfaculty.component.css']
})
export class ChapterfacultyComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: ApiService,
  ) { }

  list: any[] = [1, 2, 3, 4, 5, 6, 7];
  vids: any[] = [1, 2, 3, 4];


  chapterid: string;


  ngOnInit(): void {
    this.list = [];
    this.activatedRoute.paramMap.subscribe(param => {
      this.chapterid = param.get('id');
      this.getchapter();
      this.getfeedback(this.chapterid);
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
    console.log('posting feedback..');
    let param = { student_chapter: 1, feedback: "test" };
    this.service.savefeedback(param).subscribe(res => {
      console.log(res);
    }, err => {
      console.log('err');
      console.log(err);
    });
  }

  getfeedback(id) {
    this.service.getfeedback(id).subscribe(res => {
      this.list = res;
      console.log(this.list);
    }, err => {
      console.log('err');
      console.log(err);
    });
  }

}
