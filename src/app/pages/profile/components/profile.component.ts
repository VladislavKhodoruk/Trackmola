import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';

import { User, Vacations } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  @Input() userInfo: User;

  @Output() logoutEmmiter = new EventEmitter<void>();

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;

  readonly vacations: Vacations[] = [
    {
      fullName: 'Maria Ivakhnenko',
      photo: 'https://avatars.githubusercontent.com/u/88663763?v=4',
      vacationDay: new Date('2022-07-20T03:24:00'),
    },
    {
      fullName: 'Maria Ivakhnenko',
      photo: 'https://avatars.githubusercontent.com/u/88663763?v=4',
      vacationDay: new Date('2022-07-31T03:24:00'),
    },
  ];

  logout(event: Event): void {
    event.preventDefault();
    this.logoutEmmiter.emit();
  }
}
