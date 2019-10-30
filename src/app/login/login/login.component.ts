import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/model/User';
import { CookieService } from 'ngx-cookie-service';

// import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

@Component({
  selector: 'mma-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string = '';
  public loginForm: FormGroup;
  private token: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.cookieService.delete('username');
    this.loadDefaultLoginForm();
  }

  loadDefaultLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    try {
      const user = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
      let isLoggedin = this.loginService.login(user);
      if (isLoggedin) {
        this.cookieService.set('username', this.loginForm['username']);
        this.router.navigate(['/meetings']);
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.log(error);
      this.router.navigate(['/login']);
    }
  }
}
