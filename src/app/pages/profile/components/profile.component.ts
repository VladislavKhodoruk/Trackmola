import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';

import { getCurrentHolidays } from '@shared/helpers/helpers';
import { User, Vacation, Vacations } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  @Input() userInfo: User;

  @Output() logoutEmmiter = new EventEmitter<void>();

  @Input() vacations: Vacation[];

  @Input() users: User[];

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;

  protected get vacationsAndHoliday(): Vacations[] {
    if (this.userInfo && this.vacations.length && this.users.length) {
      return getCurrentHolidays(
        this.userInfo.location,
        this.vacations,
        this.users
      );
    }
    return [];
  }

  logout(event: Event): void {
    event.preventDefault();
    this.logoutEmmiter.emit();
  }
}
