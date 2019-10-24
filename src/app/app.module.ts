import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemMeetingService } from 'src/api/inMemMeetingService';
import { AppRoutingModule } from './app-routing.module';
import { MeetingModule } from './meeting/meeting.module';
import { LoginModule } from './login/login.module';
import { CookieService } from 'ngx-cookie-service';
import { DlDateTimeDateModule } from 'angular-bootstrap-datetimepicker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemMeetingService),
    MeetingModule,
    AppRoutingModule,
    LoginModule,
    DlDateTimeDateModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    CookieService
  ]
})
export class AppModule { }
