import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setFirstAndLastDayOfWeek } from 'src/app/store/shared/shared.actions';
import {
  getFirstDayOfWeek,
  getLastDayOfWeek,
} from 'src/app/store/shared/shared.selectors';
import { TrackMolaState } from 'src/app/store/trackMola.state';
import { FirstAndLastDayOfWeek } from '../../interfaces/interfaces';

@Component({
  selector: 'app-navigatinon-calendar-container',
  template: `<app-navigatinon-calendar
    [firstDayOfWeek]="firstDayOfWeek$ | async"
    [lastDayOfWeek]="lastDayOfWeek$ | async"
  ></app-navigatinon-calendar>`,
})
export class NavigatinonCalendarContainer {
  firstDayOfWeek$: Observable<Date | null>;
  lastDayOfWeek$: Observable<Date | null>;

  constructor(private store: Store<TrackMolaState>) {
    this.store.dispatch(
      setFirstAndLastDayOfWeek({
        firstAndLastDayOfWeek: this.getFirstAndLastDayOfWeek(new Date()),
      })
    );
    this.firstDayOfWeek$ = this.store.select(getFirstDayOfWeek);
    this.lastDayOfWeek$ = this.store.select(getLastDayOfWeek);
  }

  getFirstAndLastDayOfWeek(date: Date): FirstAndLastDayOfWeek {
    const myDate = new Date(date);
    const dayOfWeek = myDate.getDay();
    const myMonday = myDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    myDate.setUTCHours(0);
    myDate.setUTCMinutes(0);
    myDate.setUTCSeconds(0);
    return {
      firstDay: new Date(myDate.setDate(myMonday)),
      lastDay: new Date(myDate.setDate(myMonday + 6)),
    };
  }
}
