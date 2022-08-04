import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ONE_WEEK_IN_SECONDS } from '@shared/constants/constants';
import { PeriodType } from '@shared/enums/enum';
import { getPeriod } from '@shared/helpers/helpers';
import {
  nextWeek,
  previousWeek,
  setPeriod,
} from '@store/common/common.actions';
import { getFirstDay, getLastDay } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-navigation-calendar-container',
  template: `<app-navigation-calendar
    [firstDay]="firstDay$ | async"
    [lastDay]="lastDay$ | async"
    (previousWeek)="onPreviousWeek()"
    (nextWeek)="onNextWeek()"
  ></app-navigation-calendar>`,
})
export class NavigationCalendarContainer {
  readonly firstDay$ = this.store$.select(getFirstDay);
  readonly lastDay$ = this.store$.select(getLastDay);

  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(
      setPeriod({
        period: getPeriod(new Date(), PeriodType.Week),
      })
    );
  }

  public onPreviousWeek(): void {
    this.store$.dispatch(
      previousWeek({
        value: ONE_WEEK_IN_SECONDS,
      })
    );
  }

  public onNextWeek(): void {
    this.store$.dispatch(
      nextWeek({
        value: ONE_WEEK_IN_SECONDS,
      })
    );
  }
}
