import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import pineappleIcon from '@iconify/icons-noto/pineapple';
import { IconifyIcon } from '@iconify/types';

import { Vacations } from '@shared/interfaces/interfaces';
@Component({
  selector: 'app-vacations-component',
  templateUrl: 'vacations.component.html',
  styleUrls: ['vacations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacationsComponent {
  @Input() data: Vacations[];
  pineapple: IconifyIcon = pineappleIcon;
}
