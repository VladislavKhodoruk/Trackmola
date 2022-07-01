import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeDate, getAllTasksTrack } from '@store/shared/shared.actions';
import {
  allTasksTrack,
  getDate,
  getFirstDayOfWeek,
} from '@store/shared/shared.selectors';
import { TrackMolaState } from '@store/trackMola.state';

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
  allTasks$ = this.store$.select(allTasksTrack);
  firstDayOfWeek$ = this.store$.select(getFirstDayOfWeek);

  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(getAllTasksTrack());
  }

  onChangeDate(day: Date): void {
    this.store$.dispatch(changeDate({ date: day }));
  }
}
