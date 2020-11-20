import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Activity } from 'src/app/classes/activity';
import { Block } from 'src/app/classes/block';

@Component({
  selector: 'app-filechecking',
  templateUrl: './filechecking.component.html',
  styleUrls: ['./filechecking.component.css']
})
export class FilecheckingComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ApiService,
  ) { }

  list: any[] = [1, 2, 3, 4, 5, 6, 7, 8];

  sections: Block[];
  activities: Activity[];

  ngOnInit(): void {
    this.getactivity(1);//lecture
    //this.getactivity(2);//laboratory
    this.getsections();
  }

  getsections() {
    this.service.getsectionlistperprof().subscribe(res => {
      this.sections = res;
      this.sections = this.sections.filter(s => s.user == sessionStorage.getItem('userid'));
    }, err => {
      console.log(err);
      //toast error
    });
  }

  getactivity(type) {
    this.service.listactivity(type).subscribe(res => {
      this.activities = res;
    }, err => {
      console.log(err);
      //toast error 
    });
  }
}
