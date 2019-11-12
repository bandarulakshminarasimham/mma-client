import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { IMeeting } from 'src/app/entities/IMeeting';
import { MeetingService } from '../../service/meeting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mma-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss']
})
export class MeetingListComponent implements OnInit {
  meetings: IMeeting[];
  pageTitle = 'Meeting Dashboard';
  errorMessage = '';

  constructor(private meetingService: MeetingService,
              private router: Router) { }

  ngOnInit() {
    this.getMeetings();
  }

  getMeetings(): void {
    this.meetingService.getMinMeetings().subscribe(meetings => {
      this.meetings = meetings['Result'];
    },
      error => {
        this.errorMessage = error;
        console.log(this.errorMessage);
      });
  }
  createMeeting(): void {
    this.router.navigate(['/meeting/create']);
  }
  updateMeeting(meeting: IMeeting): void {
    this.router.navigate(['/meeting/edit', meeting.MeetingId]);
  }
}
