import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getFirstAndLastDay } from '@shared/helpers/helpers';
import {
  nextWeek,
  previousWeek,
  setFirstAndLastDay,
} from '@store/shared/shared.actions';
import {
  getFirstDayOfWeek,
  getLastDayOfWeek,
} from '@store/shared/shared.selectors';
import { TrackMolaState } from '@store/trackMola.state';
import {
  DEFAULT_PHOTO_URL,
  ONE_WEEK_IN_SECONDS,
} from '@shared/constants/constants';

@Component({
  selector: 'app-navigatinon-calendar-container',
  template: `<app-navigatinon-calendar
    [firstDayOfWeek]="firstDayOfWeek$ | async"
    [lastDayOfWeek]="lastDayOfWeek$ | async"
    [managersPhoto]="managersPhoto"
    (previousWeek)="onPreviousWeek()"
    (nextWeek)="onNextWeek()"
  ></app-navigatinon-calendar>`,
})
export class NavigatinonCalendarContainer {
  readonly firstDayOfWeek$ = this.store$.select(getFirstDayOfWeek);
  readonly lastDayOfWeek$ = this.store$.select(getLastDayOfWeek);

  readonly managersPhoto = [
    DEFAULT_PHOTO_URL,
    DEFAULT_PHOTO_URL,
    DEFAULT_PHOTO_URL,
    DEFAULT_PHOTO_URL,
    DEFAULT_PHOTO_URL,
  ];

  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(
      setFirstAndLastDay({
        firstAndLastDay: getFirstAndLastDay(new Date(), 'week'),
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
