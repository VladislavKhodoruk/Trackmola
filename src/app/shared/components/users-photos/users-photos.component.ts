import { Component, Input } from '@angular/core';

import {
  DEFAULT_PHOTO_URL,
  MAX_USERS_PHOTO,
} from '@shared/constants/constants';
import { User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-users-photos',
  styleUrls: ['./users-photos.component.scss'],
  templateUrl: './users-photos.component.html',
})
export class UsersPhotosComponent {
  @Input() readonly users!: User[];
  @Input() readonly size: number;
  @Input() readonly classPhoto: string;
  @Input() maxUsersPhoto: number = MAX_USERS_PHOTO;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
}
