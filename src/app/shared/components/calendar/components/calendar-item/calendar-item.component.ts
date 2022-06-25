import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  CLASS_DURATION_MORE_THAN_EIGHT,
  MAXIMUM_NUMBER_OF_HOURS_IN_A_DAY,
  MAXIMUM_VALUE_BAR,
  ONE_DIVISION_CALENDAR_BAR,
} from '@shared/constants/constants';
import { Day } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss'],
})
export class CalendarItemComponent implements OnChanges {
  @Input() day!: Day;
  @Input() selected!: boolean;

  timeBar = 0;
  more = '';

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
}
