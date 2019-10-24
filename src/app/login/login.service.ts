import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }
  login(user: any): string {
    // Assumed login success then return token and displayName in response
    return user.userName;
  }
}
