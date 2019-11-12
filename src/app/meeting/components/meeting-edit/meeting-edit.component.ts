import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';

import { AttendeeService } from '../../../attendee/service/attendee.service';
import { GenericValidator } from '../../../shared/generic-validator';
import { IAttendees } from 'src/app/entities/IAttendees';
import { IMeeting } from 'src/app/entities/IMeeting';
import { MeetingService } from '../../service/meeting.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'mma-meeting-edit',
  templateUrl: './meeting-edit.component.html',
  styleUrls: ['./meeting-edit.component.scss']
})
export class MeetingEditComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private meetingService: MeetingService,
              private attendeeService: AttendeeService,) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      meetingSubject: {
        required: 'Meeting subject is required.',
        minlength: 'Meeting subject must be at least one characters.',
        maxlength: 'Meeting subject cannot exceed 50 characters.'
      },
      attendees: {
        required: 'Attendees are required.'
      },
      agenda: {
        required: 'Attendees are required.'
      },
      meetingDataTime: {
        required: 'Meeting date and time is required.'
      }
    };
    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle = 'Meeting Update';
  errorMessage = '';
  meetingForm: FormGroup;
  mdatetime: any;
  attendees: IAttendees[];
  selectedAttendees: any;

  meeting: IMeeting;
  private sub: Subscription;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  attendeesConfig = {
    displayKey: 'name',
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    searchOnKey: 'name'
  };

  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      meetingSubject: ['', [Validators.required,
      Validators.minLength(50)]],
      attendees: [''],
      agenda: ['', Validators.required],
      meetingDateTime: ['']
    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getMeetingsById(id.toString());
      }
    );
    this.getAttendees();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
    ).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.meetingForm);
    });
  }

  getMeetingsById(id: string): void {
    this.meetingService.getMeetingsById(id)
      .subscribe({
        next: (meeting: IMeeting) => this.displayMeeting(meeting),
        error: err => this.errorMessage = err
      });
  }

  getAttendees(): void {
    this.attendeeService.getAttendees().subscribe(attendees => {
      this.attendees = attendees;
    },
      error => this.errorMessage = error);
  }
  attendeesSelectionChanged(): void {
    console.log(this.selectedAttendees);
  }


  displayMeeting(meeting: IMeeting): void {
    if (this.meetingForm) {
      this.meetingForm.reset();
    }

    this.meeting = meeting;
    if (this.meeting.MeetingId === 0) {
      this.pageTitle = 'Add Meeting';
    } else {
      this.pageTitle = `Edit Meeting: ${this.meeting.Subject}`;
    }
    // Update the data on the form
    this.meetingForm.patchValue({
      meetingSubject: this.meeting.Subject,
      attendees: this.meeting.AttendeeNames,
      agenda: this.meeting.Agenda,
      meetingDataTime: this.meeting.MDateTime
    });
  }

  // deleteMeeting(): void {
  //   if (this.meeting.MeetingId === 0) {
  //     // Don't delete, it was never saved.
  //     this.onSaveComplete();
  //   } else {
  //     if (confirm(`Really delete the meeting: ${this.meeting.Subject}?`)) {
  //       this.meetingService.deleteMeeting(this.meeting.MeetingId.toString())
  //         .subscribe({
  //           next: () => this.onSaveComplete(),
  //           error: err => this.errorMessage = err
  //         });
  //     }
  //   }
  // }

  saveMeeting(): void {
    if (this.meetingForm.valid) {
      if (this.meetingForm.dirty) {
        const p = { ...this.meeting, ...this.meetingForm.value };
        this.meetingService.updateMeeting(p)
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
}
