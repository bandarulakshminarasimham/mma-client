import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetingEditComponent } from './meeting/meeting-edit/meeting-edit.component';
import { MeetingCreateComponent } from './meeting/meeting-create/meeting-create.component';
import { MeetingListComponent } from './meeting/meeting-list/meeting-list.component';
import { LoginComponent } from './login/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'meetings', component: MeetingListComponent },
  { path: 'meetings/create', component: MeetingCreateComponent },
  { path: 'meetings/edit/:id', component: MeetingEditComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
