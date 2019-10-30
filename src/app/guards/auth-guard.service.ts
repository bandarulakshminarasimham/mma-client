import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../login/login.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(private _loginService: LoginService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Guard Called');
    if (this._loginService.isAuthenticated) {
        return true;
    }

    // navigate to login page
    this._router.navigate(['/login']);
    // we can save redirect url so after authenticating we can move them back to the page they requested
    return false;
  }
}