import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Activity } from 'src/app/classes/activity';
import { Block } from 'src/app/classes/block';
import { Profactivity } from 'src/app/classes/profactivity';
import { Profchapter } from 'src/app/classes/profchapter';

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

  list: Profchapter[];
  blocks: Block[];
  block: Block;
  slc: any;

  ifclass: boolean;
  ifactivity: boolean;
  ifchapter: boolean;

  acts: Activity[];
  profacts: Profactivity[];
  profactsslc: Profactivity[];
  filter: Profactivity[];

  selectacts: Activity;

  acstart: Date;
  acend: Date;
  acslc: any;

  selectedactivity: any;
  resmessage: string;


  ngOnInit(): void {
    this.list = [];
    this.profactsslc = [];
    this.resmessage = '';
    this.selectacts = new Activity;
    this.selectedactivity = null;
    this.acslc = null;
    this.acstart = null;
    this.acend = null;
    this.filter = [];
    this.profacts = [];
    this.acts = [];
    this.block = new Block;
    this.getsections();
    this.setactive();
    //this.getactivity();
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
    this.service.getsectionlistperprof().subscribe(res => {
      this.blocks = res;
      this.blocks = this.blocks.filter(s => s.user == sessionStorage.getItem('userid'));
      this.getactivity();
      this.getchapters();
    }, err => {
      console.log(err);
      //toast error
    });
  }

  newsection() {
    this.block = new Block;
  }


  savesection() {
    this.block.user = sessionStorage.getItem('userid');
    this.service.savesection(this.block).subscribe(res => {
      if (res != undefined && res != null) {
        this.resmessage = "New section saved!";
        this.getsections();
        let cls = document.getElementById('secmodalcls');
        cls.click();
        this.block = new Block;
        let c = document.getElementById('closereg');
        c.click();
      } else {
        this.resmessage = "Saving new section failed!";
        let c = document.getElementById('closereg');
        c.click();
      }
    }, err => {
      this.resmessage = "Invalid routine!";
      let c = document.getElementById('closereg');
      c.click();
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



  selectactivity(activity: any) {
    this.filter = [];
    this.selectedactivity = activity;
    this.selectacts = this.acts.find(a => a.id == activity);
    if (this.selectacts == undefined) {
      this.selectacts = new Activity;
    }
    this.blocks.forEach(s => {
      let b = new Profactivity;
      b.section = s.id;
      b.section_code = s.code;
      this.filter.push(b);
    });
    this.profacts.forEach(p => {
      if (p.activity == activity) {
        this.filter.forEach(f => {
          if (p.section == f.section) {
            f.activity = p.activity;
            f.activity_name = p.activity_name;
            f.id = p.id;
            f.start = p.start;
            f.end = p.end;
          } else {
            f.activity = activity;
          }

        });
      }
    });
    this.profactsslc = this.profacts.filter(a => a.activity == activity);
    //this.slc = activity;
  }


  getactivity() {
    this.acts = [];
    this.service.listactivity().subscribe(res => {
      this.acts = res;
      this.getprofactivity();
    }, err => {
      console.log(err);
    });
  }


  getprofactivity() {
    this.profacts = [];
    this.service.getprofactivity().subscribe(res => {
      this.profacts = res;
      let all = [];
      this.blocks.forEach(s => {
        let list = [];
        list = this.profacts.filter(a => a.section == s.id);
        all.push(...list);
      });
      this.profacts = all;
    }, err => {
      console.log(err);
    });
  }

  profactivityselect(event) {
    let index = event.target.options.selectedIndex;
    let s = this.filter[index - 1];
    if (s == undefined || s == null) {
      this.acslc = null;
    } else {
      this.acslc = s.section;
    }
  }

  saveactivitysched() {
    let s = this.filter.find(i => i.section == this.acslc);
    let sched = new Profactivity;
    let startdate: any = this.acstart;
    let startstr: string = startdate;
    let enddate: any = this.acend;
    let endstr: string = enddate;
    sched.section = s.section;
    sched.start = startstr;
    sched.end = endstr;
    sched.activity = this.selectacts.id;
    sched.remarks = false;
    if (s.id != undefined) {
      sched.id = s.id;
    }
    this.service.setprofactivity(sched).subscribe(res => {
      if (res != undefined && res != null) {
        this.getactivity();
        let a = document.getElementById('activityview');
        a.click();
        this.resmessage = "Activity details saved!";
        let c = document.getElementById('closereg');
        c.click();
        //toast success
      }
    }, err => {
      this.resmessage = "Invalid routine!";
      let c = document.getElementById('closereg');
      c.click();
      console.log(err);
    });
  }

  gotoactivity() {
    this.router.navigate(['/faculty/home/activity/' + this.selectedactivity]);
  }


  validate(id: any, char) {
    let d = <HTMLInputElement>document.getElementById(id);

    if (d.value == null || d.value == '') {
      d.classList.add('is-invalid');
    } else if (char != null && d.value.length < char) {
      d.classList.add('is-invalid');
    } else {
      if (d.classList.contains('is-invalid')) {
        d.classList.remove('is-invalid');

      }
    }
  }


  getchapters() {
    this.service.listchapters(null).subscribe(res => {
      this.list = res;
    }, err => {
      console.log(err);
    });
  }

}
