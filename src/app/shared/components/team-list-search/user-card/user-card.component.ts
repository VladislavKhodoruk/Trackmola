import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import pineapple from '@iconify/icons-noto/pineapple';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import { UserCard } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-card',
  styleUrls: ['./user-card.component.scss'],
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  @Input() userCard: UserCard;

  @Output() setUserId = new EventEmitter<string>();

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
  readonly pineappleIcon = pineapple;

  onVacations: boolean;
}
