import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import checksIcon from '@iconify/icons-tabler/checks';
import messagePlus from '@iconify/icons-tabler/message-plus';
import angleRight from '@iconify/icons-uil/angle-right';

import { ProjectMode } from '../enums/enums';

import { UserType } from '@shared/enums/enum';
import {
  GroupBy,
  Project,
  User,
  Vacations,
} from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  @Input() readonly projectByRoute: Project;
  @Input() readonly usersGroupByProject: GroupBy<User[]>;

  currentMode: string = ProjectMode.Tasks;

  readonly iconAngleRight = angleRight;
  readonly checksIcon = checksIcon;
  readonly messagePlusIcon = messagePlus;

  readonly toggleLabels = [ProjectMode.Tasks, ProjectMode.Users];

  readonly userType = UserType;
  readonly currentUser: string = localStorage.getItem('AuthUserType');

  readonly vacations: Vacations[] = [
    {
      vacationDay: new Date('2022-07-22T03:24:00'),
      fullName: 'Kirill Borisenok',
      photo:
        'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net' +
        '/629860aa1a2bdf007095b9bb/181bf52b-1854-4deb-a661-884a6a376802/128',
    },
    {
      vacationDay: new Date('2022-07-23T03:24:00'),
      fullName: 'Andrei Shinkarev',
      photo:
        'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net' +
        '/62985f0ac3dffc0068f5ddff/864cad92-da20-48f3-b5b4-54d2a6c74170/128',
    },
    {
      vacationDay: new Date('2022-07-24T03:24:00'),
      fullName: 'Vladislav Khodoruk',
      photo:
        'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net' +
        '/6298604da0eafd0069e8f7cd/1656ba5b-b78b-4822-846f-ecb40c4e4899/128',
    },
    {
      vacationDay: new Date('2022-07-25T03:24:00'),
      fullName: 'Maria Ivakhnenko',
      photo: 'https://avatars.githubusercontent.com/u/88663763?v=4',
    },
  ];

  changeMode(mode: string): void {
    this.currentMode = mode;
  }
}
