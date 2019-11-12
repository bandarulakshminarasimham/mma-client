import { IAttendees } from 'src/app/entities/IAttendees';
import { IMeeting } from 'src/app/entities/IMeeting';
import { IUser } from 'src/app/entities/IUser';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemMeetingService implements InMemoryDbService {
  createDb() {
    const meetings: IMeeting[] = [
    ];

    const attendees: IAttendees[] = [
    ];

    const users: IUser[] = [
    ];
    return { meetings, users, attendees };
  }
}
