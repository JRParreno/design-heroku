import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chapterfaculty',
  templateUrl: './chapterfaculty.component.html',
  styleUrls: ['./chapterfaculty.component.css']
})
export class ChapterfacultyComponent implements OnInit {

  constructor() { }
  list: any[] = [1, 2, 3, 4, 5, 6, 7];

  ngOnInit(): void {
  }

}
