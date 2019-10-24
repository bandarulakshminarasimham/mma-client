import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { FormsModule } from '@angular/forms';
import { User } from 'src/model/User';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'mma-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: '';
  token: '';
  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.cookieService.delete('username');
  }
  login(): void {
    try {
      const user = {
        userName: 'admin',
        password: 'admin'
      };
      this.cookieService.set('username', user.userName);
      this.router.navigate(['/meetings']);
    } catch (error) {
      console.log(error);
      this.router.navigate(['/login']);
    }

  }
}
