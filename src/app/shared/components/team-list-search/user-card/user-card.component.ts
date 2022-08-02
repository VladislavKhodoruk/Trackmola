import { Component, Input } from '@angular/core';

import pineapple from '@iconify/icons-noto/pineapple';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import { UserCard } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-user-card',
  styleUrls: ['./user-card.component.scss'],
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  @Input() userCard: UserCard;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
  readonly pineappleIcon = pineapple;

  onVacations: boolean;
}