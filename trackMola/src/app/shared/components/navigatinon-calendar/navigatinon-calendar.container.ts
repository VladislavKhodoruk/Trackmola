import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  nextWeek,
  previousWeek,
  setFirstAndLastDayOfWeek,
} from 'src/app/store/shared/shared.actions';
import {
  getFirstDayOfWeek,
  getLastDayOfWeek,
} from 'src/app/store/shared/shared.selectors';
import { TrackMolaState } from 'src/app/store/trackMola.state';
import { ONE_WEEK_IN_SECONDS } from '../../constants/constants';
import { setMidnightTime } from '../../helpers/helpers';
import { FirstAndLastDayOfWeek } from '../../interfaces/interfaces';

@Component({
  selector: 'app-navigatinon-calendar-container',
  template: `<app-navigatinon-calendar
    [firstDayOfWeek]="firstDayOfWeek$ | async"
    [lastDayOfWeek]="lastDayOfWeek$ | async"
    (movePreviousWeek)="onPreviousWeek()"
    (moveNextWeek)="onNextWeek()"
  ></app-navigatinon-calendar>`,
})
export class NavigatinonCalendarContainer {
  firstDayOfWeek$ = this.store$.select(getFirstDayOfWeek);
  lastDayOfWeek$ = this.store$.select(getLastDayOfWeek);

  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(
      setFirstAndLastDayOfWeek({
        firstAndLastDayOfWeek: this.getFirstAndLastDayOfWeek(new Date()),
      })
    );
  }

  getFirstAndLastDayOfWeek(date: Date): FirstAndLastDayOfWeek {
    const myDate = setMidnightTime(date);
    const dayOfWeek = myDate.getDay();
    const myMonday = myDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return {
      firstDay: new Date(myDate.setDate(myMonday)),
      lastDay: new Date(myDate.setDate(myMonday + 6)),
    };
  }

  onPreviousWeek(): void {
    this.store$.dispatch(
      previousWeek({
        value: ONE_WEEK_IN_SECONDS,
      })
    );
  }

  onNextWeek(): void {
    this.store$.dispatch(
      nextWeek({
        value: ONE_WEEK_IN_SECONDS,
      })
    );
  }
}
