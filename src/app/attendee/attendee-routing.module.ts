import { RouterModule, Routes } from '@angular/router';

import { AttendeeComponent } from './container/attendee/attendee.component';
import { AttendeeCreateComponent } from './components/attendee-create/attendee-create.component';
import { AttendeeDashboardComponent } from './components/attendee-dashboard/attendee-dashboard.component';
import { AttendeeListComponent } from './components/attendee-list/attendee-list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AttendeeComponent,
    children: [
      { path: '', redirectTo: '/attendee/dashboard', pathMatch: 'full' },
      { path: 'create', component: AttendeeCreateComponent },
      { path: 'home', component: AttendeeListComponent },
      { path: 'dashboard', component: AttendeeDashboardComponent },
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AttendeeRoutingModule { }
