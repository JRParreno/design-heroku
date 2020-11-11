import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Block } from 'src/app/classes/block';

@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.css']
})
export class ClasslistComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ApiService,
  ) { }

  list: any[] = [1, 2, 3, 4, 5, 6];
  blocks: Block[];
  block: Block;
  slc: any;

  ifclass: boolean;
  ifactivity: boolean;
  ifchapter: boolean;


  ngOnInit(): void {
    this.block = new Block;
    this.getsections();
    this.setactive();
  }

  setactive() {
    if (this.router.url == "/faculty/home/classlist") {
      this.ifactivity = false;
      this.ifchapter = false;
      this.ifclass = true;
    }
    if (this.router.url == "/faculty/home/activities") {
      this.ifactivity = true;
      this.ifchapter = false;
      this.ifclass = false;
    }
    if (this.router.url == "/faculty/home/modules") {
      this.ifactivity = false;
      this.ifchapter = true;
      this.ifclass = false;
    }
  }


  getsections() {
    this.service.getsectionlistperprof(sessionStorage.getItem('username')).subscribe(res => {
      this.blocks = res;
    }, err => {
      console.log(err);
      //toast error
    });
  }


  savesection() {
    //need userid on session
    //fetch userid on success login
    this.block.user = 1;
    let b: any = this.block;
    this.service.savesection(this.block).subscribe(res => {
      if (res != undefined && res != null) {
        this.getsections();
        let cls = document.getElementById('secmodalcls');
        cls.click();
        this.block = new Block;
      }
      //toast success, close modal
      //this.getsections();
    }, err => {
      //toast error
    });
  }

  gotoclass(path: string) {
    this.router.navigate([path]);
  }

  classlistact(event) {
    this.ifactivity = false;
    this.ifchapter = false;
    this.ifclass = true;
    let c = document.getElementsByClassName("opt");
    for (let i = 0; i < c.length; i++) {
      if (c[i].id == "opclass") {
        if (!c[i].classList.contains("underline")) {
          c[i].classList.add("underline");
        }
      } else {
        if (c[i].classList.contains("underline")) {
          c[i].classList.remove("underline");
        }
      }
    }
    let e = document.getElementsByClassName("carousel-item");
    for (let i = 0; i < e.length; i++) {
      if (e[i].id == "classlist") {
        if (!e[i].classList.contains("active")) {
          e[i].classList.add("active");
        }
      } else {
        if (e[i].classList.contains("active")) {
          e[i].classList.remove("active");
        }
      }
    }
  }

  activityact(event) {
    this.ifactivity = true;
    this.ifchapter = false;
    this.ifclass = false;
    let c = document.getElementsByClassName("opt");
    for (let i = 0; i < c.length; i++) {
      if (c[i].id == "opactivity") {
        if (!c[i].classList.contains("underline")) {
          c[i].classList.add("underline");
        }
      } else {
        if (c[i].classList.contains("underline")) {
          c[i].classList.remove("underline");
        }
      }
    }
    let e = document.getElementsByClassName("carousel-item");
    for (let i = 0; i < e.length; i++) {
      if (e[i].id == "activity") {
        if (!e[i].classList.contains("active")) {
          e[i].classList.add("active");
        }
      } else {
        if (e[i].classList.contains("active")) {
          e[i].classList.remove("active");
        }
      }
    }
  }

  chapteract(event) {
    this.ifactivity = false;
    this.ifchapter = true;
    this.ifclass = false;
    let c = document.getElementsByClassName("opt");
    for (let i = 0; i < c.length; i++) {
      if (c[i].id == "opchapter") {
        if (!c[i].classList.contains("underline")) {
          c[i].classList.add("underline");
        }
      } else {
        if (c[i].classList.contains("underline")) {
          c[i].classList.remove("underline");
        }
      }
    }
    let e = document.getElementsByClassName("carousel-item");
    for (let i = 0; i < e.length; i++) {
      if (e[i].id == "chapter") {
        if (!e[i].classList.contains("active")) {
          e[i].classList.add("active");
        }
      } else {
        if (e[i].classList.contains("active")) {
          e[i].classList.remove("active");
        }
      }
    }
  }



  selectactivity(activity) {
    this.slc = activity;
  }

}
