import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import pineappleIcon from '@iconify/icons-noto/pineapple';
import calendarPlus from '@iconify/icons-tabler/calendar-plus';
import searchIcon from '@iconify/icons-tabler/search';
import { IconifyIcon } from '@iconify/types';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';

import { UserType } from '@shared/enums/enum';
import { User } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-vacation',
  styleUrls: ['./vacation.component.scss'],
  templateUrl: './vacation.component.html',
})
export class VacationComponent {
  @Input() readonly users: User[];

  readonly iconCalendarPlus: IconifyIcon = calendarPlus;
  readonly iconSearch: IconifyIcon = searchIcon;
  readonly iconPineapple: IconifyIcon = pineappleIcon;
  readonly authTypeUser: UserType = localStorage.getItem(
    'AuthUserType'
  ) as UserType;
  readonly userTypes: typeof UserType = UserType;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;

  searchUser: string;
  selectedUser: User;
}
