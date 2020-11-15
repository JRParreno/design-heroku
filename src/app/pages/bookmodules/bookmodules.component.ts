import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  ) { }

  chaptersprof: Profchapter[];
  chaptersstudent: Studentchapter[];
  activities: Activity[];
  assessments: Assessment[];
  list: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  section: any;

  ngOnInit(): void {
    this.section = sessionStorage.getItem('section');
  }

  goto(path: string) {
    this.router.navigate([path]);
  }

}
