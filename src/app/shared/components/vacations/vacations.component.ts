import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import pineapple from '@iconify/icons-noto/pineapple';
import { IconifyIcon } from '@iconify/types';

import { Vacations } from '@shared/interfaces/interfaces';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-vacations-component',
  styleUrls: ['vacations.component.scss'],
  templateUrl: 'vacations.component.html',
})
export class VacationsComponent {
  @Input() readonly vacations: Vacations[];

  readonly pineappleIcon: IconifyIcon = pineapple;
}
