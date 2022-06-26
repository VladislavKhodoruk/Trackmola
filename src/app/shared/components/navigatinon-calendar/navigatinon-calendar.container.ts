import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  nextWeek,
  previousWeek,
  setFirstAndLastDayOfWeek,
} from '@store/shared/shared.actions';
import {
  getFirstDayOfWeek,
  getLastDayOfWeek,
} from '@store/shared/shared.selectors';
import { TrackMolaState } from '@store/trackMola.state';
import {
  defaultPhotoUrl,
  ONE_WEEK_IN_SECONDS,
} from '../../constants/constants';
import { setMidnightTime } from '../../helpers/helpers';
import { FirstAndLastDayOfWeek } from '../../interfaces/interfaces';

@Component({
  selector: 'app-navigatinon-calendar-container',
  template: `<app-navigatinon-calendar
    [firstDayOfWeek]="firstDayOfWeek$ | async"
    [lastDayOfWeek]="lastDayOfWeek$ | async"
    [managersPhoto]="managersPhoto"
    (movePreviousWeek)="onPreviousWeek()"
    (moveNextWeek)="onNextWeek()"
  ></app-navigatinon-calendar>`,
})
export class NavigatinonCalendarContainer {
  readonly firstDayOfWeek$ = this.store$.select(getFirstDayOfWeek);
  readonly lastDayOfWeek$ = this.store$.select(getLastDayOfWeek);

  readonly managersPhoto = [defaultPhotoUrl, defaultPhotoUrl, defaultPhotoUrl];

  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(
      setFirstAndLastDayOfWeek({
        firstAndLastDayOfWeek: this.getFirstAndLastDayOfWeek(new Date()),
      })
    );
  }

  private getFirstAndLastDayOfWeek(date: Date): FirstAndLastDayOfWeek {
    const myDate = setMidnightTime(date);
    const dayOfWeek = myDate.getDay();
    const myMonday = myDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return {
      firstDay: new Date(myDate.setDate(myMonday)),
      lastDay: new Date(myDate.setDate(myMonday + 6)),
    };
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
