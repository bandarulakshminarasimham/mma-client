import { RouterModule, Routes } from '@angular/router';

import { MeetingComponent } from './container/meeting/meeting.component';
import { MeetingCreateComponent } from './components/meeting-create/meeting-create.component';
import { MeetingEditComponent } from './components/meeting-edit/meeting-edit.component';
import { MeetingListComponent } from './components/meeting-list/meeting-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MeetingComponent,
    children: [
      { path: '', redirectTo: '/meeting/home', pathMatch: 'full' },
      { path: 'create', component: MeetingCreateComponent },
      { path: 'home', component: MeetingListComponent },
      { path: 'edit/:id', component: MeetingEditComponent }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule { }
