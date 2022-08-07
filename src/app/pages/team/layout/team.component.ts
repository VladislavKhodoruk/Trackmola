import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import bellRinging from '@iconify/icons-tabler/bell-ringing';
import fileImport from '@iconify/icons-tabler/file-import';
import angleRight from '@iconify/icons-uil/angle-right';
import folder from '@iconify/icons-uil/folder-times';

import { IconifyIcon } from '@iconify/types';

import { UserType } from '@shared/enums/enum';
import { User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-team',
  styleUrls: ['./team.component.scss'],
  templateUrl: './team.component.html',
})
export class TeamComponent {
  @Input() userType!: string | null;
  @Input() user!: User;

  readonly types = UserType;

  readonly iconAngleRight: IconifyIcon = angleRight;
  readonly iconFileImport: IconifyIcon = fileImport;
  readonly iconFolder: IconifyIcon = folder;
  readonly iconBell: IconifyIcon = bellRinging;

  constructor(public router: Router) {}
}
