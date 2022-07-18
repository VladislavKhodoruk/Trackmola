import { EventEmitter, Output, Component } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import { PeriodType } from '@shared/enums/enum';

import { getPeriod } from '@shared/helpers/helpers';
import { Period } from '@shared/interfaces/interfaces';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMMM',
    dateA11yLabel: 'DD',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class DatepickerComponent {
  @Output() getFirstandLastDay: EventEmitter<Period> =
    new EventEmitter<Period>();
  period: Period = getPeriod(new Date(), PeriodType.Week);
  start = new Date(this.period.start);
  end = new Date(this.period.end);

  onGetFirstandLastDay(): void {
    if (this.end) {
      const firstandLastDay = {
        start: this.start.getTime(),
        end: this.end.getTime(),
      };
      this.period = firstandLastDay;
    }
    this.getFirstandLastDay.emit(this.period);
  }
}