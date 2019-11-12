import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BasicAuthInterceptor } from './common/BasicAuthInterceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { DlDateTimeDateModule } from 'angular-bootstrap-datetimepicker';
import { ErrorInterceptor } from './common/ErrorInterceptor';
import { LoginModule } from './login/login.module';
import { MeetingModule } from './meeting/meeting.module';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavigationMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MeetingModule,
    AppRoutingModule,
    LoginModule,
    DlDateTimeDateModule
  ],
  bootstrap: [AppComponent],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class AppModule { }
