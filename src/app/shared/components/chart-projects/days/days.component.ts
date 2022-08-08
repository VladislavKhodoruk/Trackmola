/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Period } from './../../../interfaces/interfaces';

import { DaysByPeriod } from '@pages/dashboard/interfaces/interface';
import { daysInPeriod, isWeekend } from '@shared/helpers/helpers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-days',
  styleUrls: ['./days.component.scss'],
  templateUrl: './days.component.html',
})
export class DaysComponent {
  @Input() readonly period: Period;
  @Input() readonly width: number;
  @Input() readonly marginRight: number;

  protected get daysInPeriod(): DaysByPeriod {
    return daysInPeriod(this.period);
  }

  protected isWeekend(day: number): boolean {
    return isWeekend(day);
  }
}
