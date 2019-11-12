import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';

import { AttendeeService } from '../../../attendee/service/attendee.service';
import { GenericValidator } from '../../../shared/generic-validator';
import { IAttendees } from 'src/app/entities/IAttendees';
import { IMeeting } from 'src/app/entities/IMeeting';
import { MeetingService } from '../../service/meeting.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'mma-meeting-create',
  templateUrl: './meeting-create.component.html',
  styleUrls: ['./meeting-create.component.scss']
})

export class MeetingCreateComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              private meetingService: MeetingService,
              private attendeeService: AttendeeService,
              private modalService: NgbModal) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      Subject: {
        required: 'Meeting subject is required.',
        minlength: 'Meeting subject must be at least one characters.',
        maxlength: 'Meeting subject cannot exceed 50 characters.'
      },
      Agenda: {
        required: 'Attendees are required.'
      },
      MDateTime: {
        required: 'Meeting date and time is required.'
      }
    };
    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle = 'Meeting Create';
  errorMessage = '';
  meetingForm: FormGroup;
  public addAttendeeForm: FormGroup;
  mdatetime: any;
  attendees: IAttendees[];
  selectedAttendees: IAttendees[];
  selectedAttendeesForm: any;
  meeting: IMeeting;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  attendeesConfig = {
    displayKey: 'Name',
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    searchOnKey: 'AttendeeId'
  };

  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      Subject: ['', [Validators.required, Validators.minLength(50)]],
      Agenda: ['', Validators.required],
      Attendees: [''],
      MDateTime: [''],
      SelectedAttendees: ['']
    });
    this.getAttendees();
    this.loadDefaultAddAttendeeForm();
  }

  loadDefaultAddAttendeeForm() {
    this.addAttendeeForm = this.fb.group({
      attendee: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.meetingForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.meetingForm);
    });
  }

  getAttendees(): void {
    this.attendeeService.getAttendees().subscribe(attendees => {
      debugger
      this.attendees = attendees.Result;
    },
      error => this.errorMessage = error);
  }
  attendeesSelectionChanged(event: any): void {
    debugger
    // this.selectedAttendees = event;
  }

  saveMeeting(): void {
    if (this.meetingForm.valid) {
      if (this.meetingForm.dirty) {
        debugger
        const p = { ...this.meeting, ...this.meetingForm.value };
        this.meetingService.createMeeting(p)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });

      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.meetingForm.reset();
    this.router.navigate(['/meeting']);
  }

  openAddAttendes(modal) {
    this.modalService.open(modal, { centered: true });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  addAttendee() {
    const attendee = {
      Name: this.addAttendeeForm.value.attendee
    };

    if (attendee) {
      this.attendeeService.addAttendee(attendee)
        .subscribe({
          next: () => this.getAttendees(),
          error: err => this.errorMessage = err
        });
      this.closeModal();
    }
  }
}
