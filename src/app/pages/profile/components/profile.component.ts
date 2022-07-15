import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';

import { User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @Input() userInfo: User;

  @Output() logoutEmmiter = new EventEmitter<void>();

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;

  logout(event: Event): void {
    event.preventDefault();
    this.logoutEmmiter.emit();
  }
}
