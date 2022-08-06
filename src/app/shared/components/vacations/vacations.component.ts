import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import pineapple from '@iconify/icons-noto/pineapple';
import { IconifyIcon } from '@iconify/types';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import { Vacations } from '@shared/interfaces/interfaces';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-vacations-component',
  styleUrls: ['vacations.component.scss'],
  templateUrl: 'vacations.component.html',
})
export class VacationsComponent {
  @Input() readonly vacations: Vacations[];

  href = this.router.url;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;

  readonly pineappleIcon: IconifyIcon = pineapple;

  constructor(private router: Router) {}

  typeOfPhoto(elem) {
    return typeof elem;
  }
}
