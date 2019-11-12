import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../service/login.service';

// import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

@Component({
  selector: 'mma-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username = '';
  public loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    // redirect to home if already logged in
    if (this.loginService.loggedinUserValue) {
      this.router.navigate(['/meeting']);
    }
  }

  ngOnInit() {
    this.loadDefaultLoginForm();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
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
        userName: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
      this.loginService.login(user).subscribe(
        data => {
          if (data.Result) {
              this.router.navigate(['/meeting']);
            } else {
              this.router.navigate(['/login']);
            }
        },
        error => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );

    } catch (error) {
      console.log(error);
      this.router.navigate(['/login']);
    }
  }
}
