import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import pineapple from '@iconify/icons-noto/pineapple';
import { IconifyIcon } from '@iconify/types';

import { Vacations } from '@shared/interfaces/interfaces';
@Component({
  selector: 'app-vacations-component',
  templateUrl: 'vacations.component.html',
  styleUrls: ['vacations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacationsComponent {
  @Input() vacations: Vacations[];
  pineappleIcon: IconifyIcon = pineapple;
}
