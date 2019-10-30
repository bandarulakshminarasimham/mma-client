import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isAuthenticated = false;
  constructor() { }
  login(user: any): boolean {
    // Assumed login success then return token and displayName in response

    // Mock Authentication
    this.isAuthenticated = user.username === 'admin' && user.password === 'admin';
    return this.isAuthenticated;
  }
}
