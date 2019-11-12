import { HttpClient } from '@angular/common/http';
import { IMeeting } from 'src/app/entities/IMeeting';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient) { }
  getMinMeetings(): Observable<IMeeting[]> {
    const url = `${environment.baseUrl}/api/meeting`;
    return this.http.get<IMeeting[]>(url);
  }
  getMeetingsById(id: string): Observable<IMeeting> {
    const _id = parseInt(id);
    const url = `${environment.baseUrl}/api/meeting/${_id}`;
    return this.http.get<IMeeting>(url);
  }
  createMeeting(meeting: any): any {
    debugger
    const url = `${environment.baseUrl}/api/meeting`;
    const _meeting = {
      Subject: meeting.Subject,
      Agenda: meeting.Agenda,
      MDateTime: meeting.MDateTime,
      Attendees: meeting.SelectedAttendees.map(t => t.AttendeeId)
    };
    return this.http.post(url, _meeting);
  }
  updateMeeting(meeting: IMeeting): Observable<IMeeting[]> {
    const url =  `${environment.baseUrl}/api/meeting`;
    return this.http.get<IMeeting[]>(url);
  }
}
