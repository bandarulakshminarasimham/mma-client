import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MeetingEditComponent } from './meeting-edit/meeting-edit.component';
import { MeetingCreateComponent } from './meeting-create/meeting-create.component';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { SelectDropDownModule } from 'ngx-select-dropdown';


@NgModule({
  declarations: [MeetingListComponent, MeetingEditComponent, MeetingCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DlDateTimePickerModule,
    SelectDropDownModule
  ]
})
export class MeetingModule { }
