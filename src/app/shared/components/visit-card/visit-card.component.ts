import { Component, Input } from '@angular/core';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import { User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-visit-card',
  styleUrls: ['./visit-card.component.scss'],
  templateUrl: './visit-card.component.html',
})
export class VisitCardComponent {
  @Input() user!: User;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
}
