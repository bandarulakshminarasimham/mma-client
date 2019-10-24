import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meeting } from 'src/model/Meeting';
import { Observable } from 'rxjs';
import { Attendees } from 'src/model/Attendees';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient) { }
  getMinMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>('/api/meetings');
  }
  getMeetingsById(id: string): Observable<Meeting> {
    return this.http.get<Meeting>(`/api/meetings/${id}`);
  }
  deleteMeeting(id: string): Observable<Meeting> {
    return this.http.get<Meeting>(`/api/meetings/${id}`);
  }
  createMeeting(meeting: Meeting): Observable<Meeting[]> {
    return this.http.get<Meeting[]>('/api/meetings');
  }
  updateMeeting(meeting: Meeting): Observable<Meeting[]> {
    return this.http.get<Meeting[]>('/api/meetings');
  }
  getAttendees(): Observable<Attendees[]> {
    return this.http.get<Attendees[]>('/api/attendees');
  }
}
