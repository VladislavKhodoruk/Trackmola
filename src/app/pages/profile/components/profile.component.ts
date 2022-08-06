import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';

import { getCurrentHolidays } from '@shared/helpers/helpers';
import { User, Vacation, Vacations } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  @Input() userInfo: User;

  @Output() logoutEmmiter = new EventEmitter<void>();

  @Input() vacations: Vacation[];

  @Input() users: User[];

  vacationsAndHoliday: Vacations[];

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;

  ngOnInit() {
    if (this.userInfo) {
      this.vacationsAndHoliday = getCurrentHolidays(
        this.userInfo?.location,
        this.vacations,
        this.users
      );
    }
  }

  logout(event: Event): void {
    event.preventDefault();
    this.logoutEmmiter.emit();
  }
}
