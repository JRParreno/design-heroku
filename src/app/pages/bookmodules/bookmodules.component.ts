import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Activity } from 'src/app/classes/activity';
import { Assessment } from 'src/app/classes/assessment';
import { Profchapter } from 'src/app/classes/profchapter';
import { Studentchapter } from 'src/app/classes/studentchapter';

@Component({
  selector: 'app-bookmodules',
  templateUrl: './bookmodules.component.html',
  styleUrls: ['./bookmodules.component.css']
})
export class BookmodulesComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ApiService,
  ) { }

  chaptersprof: Profchapter[];
  chaptersstudent: Studentchapter[];
  activities: Activity[];
  assessments: Assessment[];
  list: Profchapter[];

  section: any;

  ngOnInit(): void {
    this.list = [];
    this.section = sessionStorage.getItem('section');
    this.getchapters();
  }

  goto(path: string) {
    this.router.navigate([path]);
  }



  getchapters() {
    this.service.listchapters(null).subscribe(res => {
      this.list = res;
      this.list.sort((a, b) => (a.id > b.id) ? 1 : -1);
    }, err => {
      console.log(err);
    });
  }

}
