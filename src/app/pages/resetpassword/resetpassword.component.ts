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

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token_valid = params['token_valid'];
      this.message = params['message'];
      this.uidb64 = params['uidb64'];
      this.token = params['token'];
      if (this.token_valid == undefined || this.uidb64 == undefined || this.token == undefined) {
        this.router.navigate([""]);
      }
      console.log(this.token_valid);
      console.log(this.message);
      console.log(this.uidb64);
      console.log(this.token);
    });
  }




  submitresetpassword() {
    console.log(this.pass1);
    let param = { token: this.token, uidb64: this.uidb64, password: this.pass1 };
    this.service.submitresetpassword(param).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
