import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserauthService implements CanActivate {

  constructor(private router: Router, private api: ApiService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.userLoggedin()) {
      return true;
    } else {
      sessionStorage.clear();
      this.router.navigate(['/portal/faculty']);
      return false;
    }
    //throw new Error('Method not implemented.');
  }

  userLoggedin(): boolean {
    let user = sessionStorage.getItem('username');
    let prof = sessionStorage.getItem('professor');
    return !(user === null || prof === null)
  }
}
