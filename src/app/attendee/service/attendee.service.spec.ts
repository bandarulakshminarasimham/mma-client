import { AttendeeService } from './attendee.service';
import { TestBed } from '@angular/core/testing';

describe('ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttendeeService = TestBed.get(AttendeeService);
    expect(service).toBeTruthy();
  });
});
