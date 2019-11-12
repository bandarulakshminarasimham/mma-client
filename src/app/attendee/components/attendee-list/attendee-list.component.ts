import { Component, OnInit } from '@angular/core';

import { AttendeeService } from './../../service/attendee.service';
import { IAttendees } from './../../../entities/IAttendees';
import { Router } from '@angular/router';

@Component({
  selector: 'mma-attendee-list',
  templateUrl: './attendee-list.component.html',
  styleUrls: ['./attendee-list.component.scss']
})
export class AttendeeListComponent implements OnInit {
  attendees: IAttendees[];
  pageTitle = 'Attendee Dashboard';
  errorMessage = '';
  constructor(private attendeeService: AttendeeService) { }

  ngOnInit() {
    this.getAttendees();
  }


  getAttendees(): void {
    this.attendeeService.getAttendees().subscribe(attendee => {
      this.attendees = attendee['Result'];
    },
      error => {
        this.errorMessage = error;
        console.log(this.errorMessage);
      });
  }

}
