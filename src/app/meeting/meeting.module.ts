import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { ManagerRoutingModule } from './meeting-routing.module';
import { MeetingCreateComponent } from './components/meeting-create/meeting-create.component';
import { MeetingEditComponent } from './components/meeting-edit/meeting-edit.component';
import { MeetingListComponent } from './components/meeting-list/meeting-list.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MeetingComponent } from './container/meeting/meeting.component';

@NgModule({
  declarations: [MeetingListComponent, MeetingEditComponent, MeetingCreateComponent, MeetingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DlDateTimePickerModule,
    SelectDropDownModule,
    NgbModule,
    ManagerRoutingModule
  ]
})
export class MeetingModule { }
