import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeCreateComponent } from './attendee-create.component';

describe('AttendeeCreateComponent', () => {
  let component: AttendeeCreateComponent;
  let fixture: ComponentFixture<AttendeeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendeeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
