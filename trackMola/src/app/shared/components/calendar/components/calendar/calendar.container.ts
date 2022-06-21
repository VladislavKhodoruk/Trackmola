import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeDate, getAllTasks } from 'src/app/store/shared/shared.actions';
import {
  allTasks,
  getDate,
  getFirstDayOfWeek,
} from 'src/app/store/shared/shared.selectors';
import { TrackMolaState } from 'src/app/store/trackMola.state';

@Component({
  selector: 'app-calendar-container',
  template: `<app-calendar
    [date]="date$ | async"
    [allTasks]="allTasks$ | async"
    [firstDayOfWeek]="firstDayOfWeek$ | async"
    (changeDate)="onChangeDate($event)"
  ></app-calendar>`,
})
export class CalendarContainer {
  date$ = this.store$.select(getDate);
  allTasks$ = this.store$.select(allTasks);
  firstDayOfWeek$ = this.store$.select(getFirstDayOfWeek);

  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(getAllTasks());
  }

  onChangeDate(day: Date): void {
    this.store$.dispatch(changeDate({ date: day }));
  }
}
