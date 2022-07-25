import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import arrowNarrowLeft from '@iconify/icons-tabler/arrow-narrow-left';
import arrowNarrowRight from '@iconify/icons-tabler/arrow-narrow-right';

import { ONE_WEEK_IN_SECONDS } from '@shared/constants/constants';
import { PeriodType } from '@shared/enums/enum';
import { getPeriod } from '@shared/helpers/helpers';
import { Period } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-date-switch',
  styleUrls: ['./date-switch.component.scss'],
  templateUrl: './date-switch.component.html',
})
export class DateSwitchComponent implements OnChanges {
  @Input() period: PeriodType.Week | PeriodType.Month = PeriodType.Week;
  @Input() date: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  @Output() getFirstandLastDay: EventEmitter<Period> =
    new EventEmitter<Period>();
  readonly iconArrowNarrowLeft = arrowNarrowLeft;
  readonly iconArrowNarrowRight = arrowNarrowRight;

  firstDay: number;
  lastDay: number;
  firstandLastDay: Period;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.period && this.period) {
      this.firstDay = getPeriod(new Date(this.date), this.period).start;
      this.lastDay = getPeriod(new Date(this.date), this.period).end;
      this.firstandLastDay = getPeriod(new Date(this.date), this.period);
    }
  }

  previousPeriod() {
    switch (this.period) {
      case PeriodType.Week: {
        this.firstDay -= ONE_WEEK_IN_SECONDS;
        this.lastDay -= ONE_WEEK_IN_SECONDS;
        const firstandLastDay = {
          end: this.lastDay,
          start: this.firstDay,
        };
        this.firstandLastDay = firstandLastDay;
        break;
      }
      case PeriodType.Month: {
        this.date = new Date(
          new Date(this.firstDay).getFullYear(),
          new Date(this.firstDay).getMonth() - 1
        );
        this.firstandLastDay = getPeriod(this.date, this.period);
        this.firstDay = this.firstandLastDay.start;
        this.lastDay = this.firstandLastDay.end;
        break;
      }
    }
    this.getFirstandLastDay.emit(this.firstandLastDay);
  }

  nextPeriod() {
    switch (this.period) {
      case PeriodType.Week: {
        this.firstDay += ONE_WEEK_IN_SECONDS;
        this.lastDay += ONE_WEEK_IN_SECONDS;
        const firstandLastDay = {
          end: this.lastDay,
          start: this.firstDay,
        };
        this.firstandLastDay = firstandLastDay;
        break;
      }
      case PeriodType.Month: {
        this.date = new Date(
          new Date(this.firstDay).getFullYear(),
          new Date(this.firstDay).getMonth() + 1
        );
        this.firstandLastDay = getPeriod(this.date, this.period);
        this.firstDay = this.firstandLastDay.start;
        this.lastDay = this.firstandLastDay.end;
        break;
      }
    }
    this.getFirstandLastDay.emit(this.firstandLastDay);
  }
}
