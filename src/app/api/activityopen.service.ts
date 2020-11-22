import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityopenService implements CanActivate {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isactive();
  }


  isactive(): boolean {
    if (sessionStorage.getItem('tempactivity') != null && sessionStorage.getItem('tempactivity') != undefined) {
      return true;
    } else {
      this.router.navigate(["/student/home"]);
      return false;
    }
  }
}
