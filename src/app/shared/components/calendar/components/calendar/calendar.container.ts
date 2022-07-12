import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeDate } from '@store/common/common.actions';
import {
  getDate,
  getFirstDay,
  getTasksTrackByPeriod,
} from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-calendar-container',
  template: `<app-calendar
    [date]="date$ | async"
    [numPreviousWeek]="numPreviousWeek"
    [allTasks]="allTasks$ | async"
    [firstDay]="firstDay$ | async"
    (changeDate)="onChangeDate($event)"
  ></app-calendar>`,
})
export class CalendarContainer {
  @Input() numPreviousWeek = 1;
  date$ = this.store$.select(getDate);
  allTasks$ = this.store$.select(getTasksTrackByPeriod);
  firstDay$ = this.store$.select(getFirstDay);

  constructor(private store$: Store<TrackMolaState>) {}

  onChangeDate(day: number): void {
    this.store$.dispatch(changeDate({ date: day }));
  }
}
