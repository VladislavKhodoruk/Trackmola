import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import bellRinging from '@iconify/icons-tabler/bell-ringing';
import fileImport from '@iconify/icons-tabler/file-import';
import angleRight from '@iconify/icons-uil/angle-right';

import folder from '@iconify/icons-uil/folder-times';

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

  types = UserType;

  readonly iconAngleRight = angleRight;
  readonly iconFileImport = fileImport;
  readonly iconFolder = folder;
  readonly iconBell = bellRinging;

  constructor(public router: Router) {}
}
