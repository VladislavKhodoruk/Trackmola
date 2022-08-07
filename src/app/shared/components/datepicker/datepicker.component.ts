import { EventEmitter, Output, Component } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import { PeriodType } from '@shared/enums/enum';

import { getPeriod } from '@shared/helpers/helpers';
import { Period } from '@shared/interfaces/interfaces';

export const MY_DATE_FORMATS = {
  display: {
    dateA11yLabel: 'DD',
    dateInput: 'MM/DD/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
    monthYearLabel: 'MMMM',
  },
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
};

@Component({
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
  selector: 'app-datepicker',
  styleUrls: ['./datepicker.component.scss'],
  templateUrl: './datepicker.component.html',
})
export class DatepickerComponent {
  @Output() getFirstandLastDay: EventEmitter<Period> =
    new EventEmitter<Period>();
  period: Period = getPeriod(new Date(), PeriodType.TwoWeek);
  start = new Date(this.period.start);
  end = new Date(this.period.end);

  onGetFirstandLastDay(): void {
    if (this.end) {
      this.end.setHours(23);
      this.end.setMinutes(59);
      this.end.setSeconds(59);

      const firstandLastDay = {
        end: this.end.getTime(),
        start: this.start.getTime(),
      };
      this.period = firstandLastDay;
    }
    this.getFirstandLastDay.emit(this.period);
  }
}
