import { Component } from '@angular/core';
import pineapple from '@iconify/icons-noto/pineapple';
import { IconifyIcon } from '@iconify/types';

@Component({
  selector: 'app-holiday',
  styleUrls: ['./holidays.component.scss'],
  templateUrl: './holidays.component.html',
})
export class HolidaysComponent {
  readonly pineappleIcon: IconifyIcon = pineapple;
}
