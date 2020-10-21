import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapterfaculty',
  templateUrl: './chapterfaculty.component.html',
  styleUrls: ['./chapterfaculty.component.css']
})
export class ChapterfacultyComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  list: any[] = [1, 2, 3, 4, 5, 6, 7];
  vids: any[] = [1, 2, 3, 4];


  ngOnInit(): void {
    this.getchapter();
  }


  getchapter() {
    let lecture = document.getElementById('lecture');
    this.http.get('/assets/chapters/CHAPTER1.html', { responseType: "text" }).subscribe(res => {
      lecture.innerHTML = res;
    })
  }

  goto(path) {
    this.router.navigate([path]);
  }

}
