import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { MeetingService } from '../meeting.service';
import { Meeting } from 'src/model/Meeting';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { Attendees } from 'src/model/Attendees';


@Component({
  selector: 'mma-meeting-create',
  templateUrl: './meeting-create.component.html',
  styleUrls: ['./meeting-create.component.css']
})
export class MeetingCreateComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private meetingService: MeetingService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      meetingSubject: {
        required: 'Meeting subject is required.',
        minlength: 'Meeting subject must be at least one characters.',
        maxlength: 'Meeting subject cannot exceed 50 characters.'
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
  pageTitle = 'Meeting Create';
  errorMessage = '';
  meetingForm: FormGroup;
  mdatetime: any;
  attendees: Attendees[];
  selectedAttendees: any;
  meeting: Meeting;

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
      agenda: ['', Validators.required],
      attendees: [''],
      meetingDataTime: ['', Validators.required],
      selectedAttendees: ['']
    });
    this.getAttendees();
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
    this.meetingService.getAttendees().subscribe(attendees => {
      this.attendees = attendees;
    },
      error => this.errorMessage = error);
  }
  attendeesSelectionChanged(event: any): void {
    debugger
    console.log(this.selectedAttendees);
    // const value = this.selectedAttendees.map(t => t.name).join(',');
  }

  saveMeeting(): void {
    if (this.meetingForm.valid) {
      if (this.meetingForm.dirty) {
        let p = { ...this.meeting, ...this.meetingForm.value };
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
    this.router.navigate(['/meetings']);
  }
}
