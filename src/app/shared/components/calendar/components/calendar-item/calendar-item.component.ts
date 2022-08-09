import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import fireIcon from '@iconify/icons-emojione/fire';
import { IconifyIcon } from '@iconify/types';

import {
  CLASS_DURATION_MORE_THAN_EIGHT,
  MAXIMUM_NUMBER_OF_HOURS_IN_A_DAY,
  MAXIMUM_VALUE_BAR,
  ONE_DIVISION_CALENDAR_BAR,
} from '@shared/constants/constants';
import { isWeekend } from '@shared/helpers/helpers';
import { Day } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-calendar-item',
  styleUrls: ['./calendar-item.component.scss'],
  templateUrl: './calendar-item.component.html',
})
export class CalendarItemComponent implements OnChanges {
  @Input() day!: Day;
  @Input() selected!: boolean;

  readonly iconFire: IconifyIcon = fireIcon;

  timeBar = 0;
  more = '';

  todayDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ).getTime();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.day) {
      if (this.day?.duration <= MAXIMUM_NUMBER_OF_HOURS_IN_A_DAY) {
        this.timeBar = this.day.duration * ONE_DIVISION_CALENDAR_BAR;
        return;
      }
      this.timeBar = MAXIMUM_VALUE_BAR;
      this.more = CLASS_DURATION_MORE_THAN_EIGHT;
    }
  }

  protected isWeekend(date: number): boolean {
    return isWeekend(date);
  }
}
