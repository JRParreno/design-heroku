import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Block } from 'src/app/classes/block';
import { Student } from 'src/app/classes/student';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ApiService
  ) { }

  list: any[] = [1, 2, 3, 4, 5, 6, 7];
  studentlist: Student[];
  student: Student;

  blocks: Block[];

  ngOnInit(): void {
    this.blocks = [];
    this.getsections();
  }

  goto(path: string) {
    this.router.navigate([path]);
  }


  getsections() {
    this.service.getsectionlistperprof(sessionStorage.getItem('username')).subscribe(res => {
      console.log(res);
      this.blocks = res;
    }, err => {
      console.log(err);
      //toast error
    });
  }
}
