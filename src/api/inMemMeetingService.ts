import { User } from './../model/User';
import { Meeting } from './../model/Meeting';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Attendees } from 'src/model/Attendees';

export class InMemMeetingService implements InMemoryDbService {
  createDb() {
    const meetings: Meeting[] = [
      {
        id: 1,
        meetingSubject: 'This is sample meeting',
        attendees: 'Brad Guzan, JohnSmith B, Ronaldo record, Sean Johnson, DeAndre Yedlin, Matt Miazga',
        // tslint:disable-next-line:max-line-length
        agenda: '1. The declaration of dividend among shareholders  2.Consideration of annual accounts Discussion of the director’s report and the auditor report  3. ppointment and fixing of the remuneration of the statutory auditors  4. Appointing replacement directors in place of existing directors retiring',
        meetingDataTime: '2019/10/10 10:10:10 ',
        selectedAttendees: []
      },
      {
        id: 2,
        meetingSubject: 'This is sample meeting',
        attendees: 'Brad Guzan, JohnSmith B, Ronaldo record, Sean Johnson, DeAndre Yedlin, Matt Miazga',
        // tslint:disable-next-line:max-line-length
        agenda: '1. The declaration of dividend among shareholders  2.Consideration of annual accounts Discussion of the director’s report and the auditor report  3. ppointment and fixing of the remuneration of the statutory auditors  4. Appointing replacement directors in place of existing directors retiring',
        meetingDataTime: '2019/10/10 10:10:10 ',
        selectedAttendees: []
      },
      {
        id: 3,
        meetingSubject: 'This is sample meeting',
        attendees: 'Brad Guzan, JohnSmith B, Ronaldo record, Sean Johnson, DeAndre Yedlin, Matt Miazga',
        // tslint:disable-next-line:max-line-length
        agenda: '1. The declaration of dividend among shareholders  2.Consideration of annual accounts Discussion of the director’s report and the auditor report  3. ppointment and fixing of the remuneration of the statutory auditors  4. Appointing replacement directors in place of existing directors retiring',
        meetingDataTime: '2019/10/10 10:10:10 ',
        selectedAttendees: []
      }
    ];

    const attendees: Attendees[] = [
      {
        id: 1,
        name: 'Brad Guzan'
      },
      {
        id: 2,
        name: 'JohnSmith B'
      },
      {
        id: 3,
        name: 'Ronaldo record'
      },
      {
        id: 4,
        name: 'Sean Johnson'
      },
      {
        id: 5,
        name: 'DeAndre Yedlin'
      },
      {
        id: 6,
        name: 'Matt Miazga'
      }
    ];

    const users: User[] = [
      {
        id: 1,
        userName: 'admin',
        password: 'admin'
      }
    ];
    return { meetings, users, attendees };
  }
}
