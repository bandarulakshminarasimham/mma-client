import { BehaviorSubject, Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/entities/IUser';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedinUserSubject: BehaviorSubject<IUser>;
  public loggedinUser: Observable<IUser>;
  public isAuthenticated = false;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    if (this.cookieService.get('currentUser')) {
      this.loggedinUserSubject = new BehaviorSubject(JSON.parse(this.cookieService.get('currentUser')));
      this.loggedinUser = this.loggedinUserSubject.asObservable();
    } else {
      this.loggedinUserSubject = new BehaviorSubject(null);
      this.loggedinUser = this.loggedinUserSubject.asObservable();
    }
  }

  public get loggedinUserValue(): IUser {
    return this.loggedinUserSubject.value;
    // fack data
    // return {
    //   userName: 'admin',
    //   password: 'admin',
    //   authdata: window.btoa('admin' + ':' + 'admin')
    // };
  }

  login(user: IUser) {
    return this.http.get<any>(`${environment.baseUrl}/api/user?username=${user.userName}&password=${user.password}`)
      .pipe(map(_user => {
        debugger
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        const _value = {
          userName: user.userName,
          password: user.password,
          authdata: window.btoa(user.userName + ':' + user.password)
        };
        this.cookieService.set('currentUser', (_user.Result ? JSON.stringify(_value) : ''));
        this.loggedinUserSubject.next(user);
        this.isAuthenticated = _user.Result ? true : false;
        return _user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loggedinUserSubject.next(null);
  }

  // login(user: any): boolean {
  //   // Assumed login success then return token and displayName in response

  //   // Mock Authentication
  //   this.isAuthenticated = user.username === 'admin' && user.password === 'admin';
  //   return this.isAuthenticated;
  // }



}
