import { Component, OnInit } from '@angular/core';

import { AttendeeService } from '../../service/attendee.service';
import { IAttendees } from 'src/app/entities/IAttendees';

@Component({
  selector: 'mma-attendee-dashboard',
  templateUrl: './attendee-dashboard.component.html',
  styleUrls: ['./attendee-dashboard.component.scss']
})
export class AttendeeDashboardComponent implements OnInit {
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
