import { AttendeeComponent } from './container/attendee/attendee.component';
import { AttendeeCreateComponent } from './components/attendee-create/attendee-create.component';
import { AttendeeDashboardComponent } from './components/attendee-dashboard/attendee-dashboard.component';
import { AttendeeListComponent } from './components/attendee-list/attendee-list.component';
import { AttendeeRoutingModule } from './attendee-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AttendeeListComponent, AttendeeCreateComponent, AttendeeDashboardComponent, AttendeeComponent],
  imports: [
    CommonModule,
    AttendeeRoutingModule
  ]
})
export class AttendeeModule { }
