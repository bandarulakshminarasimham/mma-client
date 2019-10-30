import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meeting } from 'src/model/Meeting';
import { Observable } from 'rxjs';
import { Attendees } from 'src/model/Attendees';
import { MeetingVM } from 'src/model/MeetingVM';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient) { }
  getMinMeetings(): Observable<MeetingVM[]> {
    const url = 'http://localhost/mm/api/meeting';
    return this.http.get<MeetingVM[]>(url);
  }
  getMeetingsById(id: string): Observable<MeetingVM> {
    const _id = parseInt(id);
    const url = `http://localhost/mm/api/meeting/${_id}`;
    return this.http.get<MeetingVM>(url);
  }
  deleteMeeting(id: string): Observable<Meeting> {
    return this.http.get<Meeting>(`/api/meetings/${id}`);
  }
  createMeeting(meeting: Meeting): any {
    const url = 'http://localhost/mm/api/meeting';
    const _meeting = {
      Subject: meeting.meetingSubject,
      Agenda: meeting.agenda,
      MDateTime:  meeting.meetingDataTime,
      Attendees: meeting.selectedAttendees.map(t => t.id)
    };
    return this.http.post(url, _meeting);
  }
  updateMeeting(meeting: Meeting): Observable<Meeting[]> {
    return this.http.get<Meeting[]>('/api/meetings');
  }
  getAttendees(): Observable<Attendees[]> {
    const url = 'http://localhost/mm/api/attendee';
    return this.http.get<Attendees[]>(url);
  }

  addAttendee(attendee: string): Observable<string[]> {
    // returns updated attendees list
    return this.http.post<string[]>('/api/addAttendee', attendee);
  }
}
