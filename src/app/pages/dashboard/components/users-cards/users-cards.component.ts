import { Component, EventEmitter, Input, Output } from '@angular/core';

import bellRinging from '@iconify/icons-tabler/bell-ringing';
import fileImport from '@iconify/icons-tabler/file-import';
import { IconifyIcon } from '@iconify/types';

import { HOURS_IN_DAY } from '@pages/activity/constants/constants';

import { getRestMonthDefaultHours } from '@pages/activity/helpers/helpers';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import { User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-users-cards',
  styleUrls: ['./users-cards.component.scss'],
  templateUrl: './users-cards.component.html',
})
export class UsersCardsComponent {
  @Input() users!: User[];
  @Input() taskTracksDurationGroupByUser!: {
    duration: number;
    overtimeDuration: number;
  };

  @Output() userCardClick: EventEmitter<User> = new EventEmitter<User>();

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
  readonly iconBellRinging: IconifyIcon = bellRinging;
  readonly iconFileImport: IconifyIcon = fileImport;

  protected get workMonthDefaultHours(): number {
    const date = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return endDate.getDate() * HOURS_IN_DAY - getRestMonthDefaultHours();
  }

  protected getProgressUser(user: User): {
    workingHours: number;
    progress: number;
  } {
    if (this.taskTracksDurationGroupByUser) {
      const userInfo: {
        duration: number;
        overtimeDuration: number;
      } = this.taskTracksDurationGroupByUser[user.id];
      const workingHours: number =
        userInfo.duration + userInfo.overtimeDuration;
      const progress: number =
        (workingHours / this.workMonthDefaultHours) * 100;
      return {
        progress,
        workingHours,
      };
    }
    return null;
  }
}
