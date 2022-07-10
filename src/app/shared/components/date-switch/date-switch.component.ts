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
import { getPeriod } from '@shared/helpers/helpers';
import { Period } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-date-switch',
  templateUrl: './date-switch.component.html',
  styleUrls: ['./date-switch.component.scss'],
})
export class DateSwitchComponent implements OnChanges {
  @Input() period: 'week' | 'month' = 'week';
  @Output() getFirstandLastDay: EventEmitter<Period> =
    new EventEmitter<Period>();
  readonly iconArrowNarrowLeft = arrowNarrowLeft;
  readonly iconArrowNarrowRight = arrowNarrowRight;

  now = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  firstDay: number;
  lastDay: number;
  firstandLastDay: Period = getPeriod(this.now, this.period);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.period && this.period) {
      this.firstDay = getPeriod(this.now, this.period).start;
      this.lastDay = getPeriod(this.now, this.period).end;
    }
  }

  previousPeriod() {
    switch (this.period) {
      case 'week': {
        this.firstDay -= ONE_WEEK_IN_SECONDS;
        this.lastDay -= ONE_WEEK_IN_SECONDS;
        this.firstandLastDay.start = this.firstDay;
        this.firstandLastDay.end = this.lastDay;
        break;
      }
      case 'month': {
        this.now = new Date(this.now.getFullYear(), this.now.getMonth() - 1);
        this.firstandLastDay = getPeriod(this.now, this.period);
        this.firstDay = this.firstandLastDay.start;
        this.lastDay = this.firstandLastDay.end;
        break;
      }
    }
    this.getFirstandLastDay.emit(this.firstandLastDay);
  }

  nextPeriod() {
    switch (this.period) {
      case 'week': {
        this.firstDay += ONE_WEEK_IN_SECONDS;
        this.lastDay += ONE_WEEK_IN_SECONDS;
        this.firstandLastDay.start = this.firstDay;
        this.firstandLastDay.end = this.lastDay;
        break;
      }
      case 'month': {
        this.now = new Date(this.now.getFullYear(), this.now.getMonth() + 1);
        this.firstandLastDay = getPeriod(this.now, this.period);
        this.firstDay = this.firstandLastDay.start;
        this.lastDay = this.firstandLastDay.end;
        break;
      }
    }
    this.getFirstandLastDay.emit(this.firstandLastDay);
  }
}
