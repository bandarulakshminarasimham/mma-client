import { HttpClient } from '@angular/common/http';
import { IAttendees } from 'src/app/entities/IAttendees';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {

  constructor(private http: HttpClient) { }

  getAttendees(): Observable<IAttendees[]> {
    const url = `${environment.baseUrl}/api/attendee`;
    return this.http.get<IAttendees[]>(url);
  }

  addAttendee(attendee: any): Observable<string[]> {
    // returns updated attendees list
    const url = `${environment.baseUrl}/api/attendee`;
    return this.http.post<string[]>(url, attendee);
  }
}
