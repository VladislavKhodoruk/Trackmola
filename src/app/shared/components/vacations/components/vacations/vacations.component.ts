import { Component, ChangeDetectionStrategy } from '@angular/core';
import pineappleIcon from '@iconify/icons-noto/pineapple';
import { IconifyIcon } from '@iconify/types';
@Component({
  selector: 'app-vacations-component',
  templateUrl: 'vacations.component.html',
  styleUrls: ['vacations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacationsComponent {
  pineapple: IconifyIcon = pineappleIcon;
}
