import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
export class ProfileComponent implements OnChanges {
  @Input() userInfo: User;

  @Output() logoutEmmiter = new EventEmitter<void>();

  @Input() vacations: Vacation[];

  @Input() users: User[];

  vacationsAndHoliday: Vacations[];

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.userInfo && this.userInfo) {
      if (this.userInfo) {
        this.vacationsAndHoliday = getCurrentHolidays(
          this.userInfo?.location,
          this.vacations,
          this.users
        );
      }
    }
  }

  logout(event: Event): void {
    event.preventDefault();
    this.logoutEmmiter.emit();
  }
}
