import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filechecking',
  templateUrl: './filechecking.component.html',
  styleUrls: ['./filechecking.component.css']
})
export class FilecheckingComponent implements OnInit {

  constructor() { }

  list: any[] = [1, 2, 3, 4, 5, 6, 7, 8];

  ngOnInit(): void {
  }

}
