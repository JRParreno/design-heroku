import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/classes/activity';
import { Choices } from 'src/app/classes/choices';
import { Question } from 'src/app/classes/question';

@Component({
  selector: 'app-activityfaculty',
  templateUrl: './activityfaculty.component.html',
  styleUrls: ['./activityfaculty.component.css']
})
export class ActivityfacultyComponent implements OnInit {
  constructor(
    private router: Router,
  ) { }

  questions: Question[];
  activity: Activity;
  choices: Choices[];
  list: any[] = [1, 2, 3, 4];

  ngOnInit(): void {
  }

  goto(path: string) {
    this.router.navigate([path]);
  }

}
