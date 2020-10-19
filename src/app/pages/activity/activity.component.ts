import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/classes/activity';
import { Choices } from 'src/app/classes/choices';
import { Question } from 'src/app/classes/question';
import { Studentanswer } from 'src/app/classes/studentanswer';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor() { }

  questions: Question[];
  activity: Activity;
  choices: Choices[];
  answers: Studentanswer[];
  list: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  ngOnInit(): void {
  }

}
