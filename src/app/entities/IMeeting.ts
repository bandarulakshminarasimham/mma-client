export interface IMeeting {
  MeetingId: number;
  Subject: string;
  Agenda: string;
  MDateTime: string;
  selectedAttendees: number[];
  AttendeeNames: string;
}
