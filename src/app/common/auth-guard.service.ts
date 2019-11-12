import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {LoginService} from '../login/service/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(private _loginService: LoginService, private _router: Router, private cookieService: CookieService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // tslint:disable-next-line:no-bitwise
    const logggedinUser = this._loginService.loggedinUserValue;
    console.log('Guard Called');
    // if (this._loginService.isAuthenticated && logggedinUser) {
    //     return true;
    // }
    if (logggedinUser) {
      return true;
    } else {
      // const _logggedinUser = JSON.parse(localStorage.getItem('currentUser'));
      const _logggedinUser = this.cookieService.get('currentUser');
      if (_logggedinUser) {
        return true;
      }
    }

    // navigate to login page
    this._router.navigate(['/login']);
    // we can save redirect url so after authenticating we can move them back to the page they requested
    return false;
  }
}
