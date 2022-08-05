import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import pineapple from '@iconify/icons-noto/pineapple';
import { IconifyIcon } from '@iconify/types';

import { Vacation } from '@shared/interfaces/interfaces';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-vacations-component',
  styleUrls: ['vacations.component.scss'],
  templateUrl: 'vacations.component.html',
})
export class VacationsComponent {
  @Input() readonly vacations: Vacation[];

  href = this.router.url;

  userPhoto: string = localStorage.getItem('AuthUserPhoto');

  readonly pineappleIcon: IconifyIcon = pineapple;

  constructor(private router: Router) {}
}
