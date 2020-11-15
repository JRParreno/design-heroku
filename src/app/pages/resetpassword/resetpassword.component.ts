import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiService,
    private router: Router,
  ) { }




  token_valid;
  message;
  uidb64;
  token;

  pass1: string;
  pass2: string;


  resmessage: string;

  ngOnInit(): void {
    this.resmessage = '';
    this.activatedRoute.queryParams.subscribe(params => {
      this.token_valid = params['token_valid'];
      this.message = params['message'];
      this.uidb64 = params['uidb64'];
      this.token = params['token'];
    });
  }




  submitresetpassword() {
    let param = { token: this.token, uidb64: this.uidb64, password: this.pass1 };
    this.service.submitresetpassword(param).subscribe(res => {
      if (res != undefined && res.success) {
        this.resmessage = res.message;
        let c = document.getElementById('closereg');
        c.click();
      }
    }, err => {
      console.log(err);
    });
  }


  closewindow() {
    window.close();
  }

}
