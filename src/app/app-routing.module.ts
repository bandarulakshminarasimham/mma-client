import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetingEditComponent } from './meeting/meeting-edit/meeting-edit.component';
import { MeetingCreateComponent } from './meeting/meeting-create/meeting-create.component';
import { MeetingListComponent } from './meeting/meeting-list/meeting-list.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'meetings', component: MeetingListComponent, canActivate: [AuthGuardService] },
  { path: 'meetings/create', component: MeetingCreateComponent, canActivate: [AuthGuardService]},
  { path: 'meetings/edit/:id', component: MeetingEditComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
