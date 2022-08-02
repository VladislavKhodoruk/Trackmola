import { Component, Input } from '@angular/core';

import {
  GroupBy,
  Project,
  User,
  Vacations,
} from '@shared/interfaces/interfaces';
@Component({
  selector: 'app-manager-team-component',
  styleUrls: ['./manager-team.component.scss'],
  templateUrl: './manager-team.component.html',
})
export class ManagerTeamComponent {
  @Input() pickedUser: User;
  @Input() projectsByUsers: GroupBy<Project[]>;
  @Input() usersByProject: GroupBy<User[]>;
  readonly vacations: Vacations[] = [
    {
      fullName: 'Kirill Borisenok',
      photo:
        'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net' +
        '/629860aa1a2bdf007095b9bb/181bf52b-1854-4deb-a661-884a6a376802/128',
      vacationDay: new Date('2022-07-22T03:24:00'),
    },
    {
      fullName: 'Andrei Shinkarev',
      photo:
        'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net' +
        '/62985f0ac3dffc0068f5ddff/864cad92-da20-48f3-b5b4-54d2a6c74170/128',
      vacationDay: new Date('2022-07-23T03:24:00'),
    },
    {
      fullName: 'Vladislav Khodoruk',
      photo:
        'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net' +
        '/6298604da0eafd0069e8f7cd/1656ba5b-b78b-4822-846f-ecb40c4e4899/128',
      vacationDay: new Date('2022-07-24T03:24:00'),
    },
    {
      fullName: 'Maria Ivakhnenko',
      photo: 'https://avatars.githubusercontent.com/u/88663763?v=4',
      vacationDay: new Date('2022-07-25T03:24:00'),
    },
  ];
}
