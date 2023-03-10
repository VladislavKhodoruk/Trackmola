import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import bellRinging from '@iconify/icons-tabler/bell-ringing';
import fileImport from '@iconify/icons-tabler/file-import';
import angleRight from '@iconify/icons-uil/angle-right';
import folder from '@iconify/icons-uil/folder-times';

import { IconifyIcon } from '@iconify/types';

import { Route, UserType } from '@shared/enums/enum';
import { User } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-team',
  styleUrls: ['./team.component.scss'],
  templateUrl: './team.component.html',
})
export class TeamComponent {
  @Input() user!: User;
  isAdmin: boolean =
    localStorage.getItem('AuthUserType') === UserType.Admin ||
    localStorage.getItem('AuthUserType') === UserType.CTO;

  readonly types = UserType;
  readonly routes: typeof Route = Route;

  readonly iconAngleRight: IconifyIcon = angleRight;
  readonly iconFileImport: IconifyIcon = fileImport;
  readonly iconFolder: IconifyIcon = folder;
  readonly iconBell: IconifyIcon = bellRinging;
  readonly userType: string;

  constructor(protected router: Router) {
    this.userType = localStorage.getItem('AuthUserType');
  }
}
