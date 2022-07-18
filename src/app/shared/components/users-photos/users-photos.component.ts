import { Component, Input } from '@angular/core';

import {
  DEFAULT_PHOTO_URL,
  MAX_USERS_PHOTO,
} from '@shared/constants/constants';
import { User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-users-photos',
  templateUrl: './users-photos.component.html',
  styleUrls: ['./users-photos.component.scss'],
})
export class UsersPhotosComponent {
  @Input() readonly users!: User[];
  @Input() readonly size: number;
  @Input() readonly classPhoto: string;

  readonly maxUsersPhoto: number = MAX_USERS_PHOTO;
  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
}
