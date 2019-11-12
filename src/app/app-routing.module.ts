import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './common/auth-guard.service';
import { LoginComponent } from './login/login/login.component';
import { MeetingCreateComponent } from './meeting/components/meeting-create/meeting-create.component';
import { MeetingEditComponent } from './meeting/components/meeting-edit/meeting-edit.component';
import { MeetingListComponent } from './meeting/components/meeting-list/meeting-list.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'meeting',
    loadChildren: () => import('./meeting/meeting.module').then(m => m.MeetingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'attendee',
    loadChildren: () => import('./attendee/attendee.module').then(m => m.AttendeeModule),
    canActivate: [AuthGuardService]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
