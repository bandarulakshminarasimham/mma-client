import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { Meeting } from 'src/model/Meeting';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'mma-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {
  meetings: Meeting[];
  pageTitle = 'Meetings List';
  errorMessage = '';

  constructor(private meetingService: MeetingService,
    private router: Router,
    private cookieService: CookieService) { }

  ngOnInit() {
    console.log(this.cookieService.get('username'));
    this.getMeetings();
  }

  getMeetings(): void {
    this.meetingService.getMinMeetings().subscribe(meetings => {
      this.meetings = meetings;
    },
      error => this.errorMessage = error);
  }
  createMeeting(): void {
    this.router.navigate(['/meetings/create']);
  }
  updateMeeting(meeting: Meeting): void {
    this.router.navigate(['/meetings/edit', meeting.id]);
  }

  viewMeeting(meeting: Meeting): void {
    this.router.navigate(['/meetings/view', meeting.id]);
  }
}
