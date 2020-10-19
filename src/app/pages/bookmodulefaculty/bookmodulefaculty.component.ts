import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/classes/activity';
import { Assessment } from 'src/app/classes/assessment';
import { Profchapter } from 'src/app/classes/profchapter';
import { Studentchapter } from 'src/app/classes/studentchapter';

@Component({
  selector: 'app-bookmodulefaculty',
  templateUrl: './bookmodulefaculty.component.html',
  styleUrls: ['./bookmodulefaculty.component.css']
})
export class BookmodulefacultyComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  chaptersprof: Profchapter[];
  chaptersstudent: Studentchapter[];
  activities: Activity[];
  assessments: Assessment[];

  ngOnInit(): void {
  }

  goto(path: string) {
    this.router.navigate([path]);
  }

}
