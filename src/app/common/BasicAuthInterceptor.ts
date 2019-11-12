import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { LoginService } from './../login/service/login.service';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor  {

  constructor(private loginService: LoginService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     // add authorization header with basic auth credentials if available
     const loggedinUser = this.loginService.loggedinUserValue;
     if (loggedinUser && loggedinUser.authdata) {
         request = request.clone({
             setHeaders: {
                 Authorization: `Basic ${loggedinUser.authdata}`
             }
         });
     }

     return next.handle(request);
  }
}
