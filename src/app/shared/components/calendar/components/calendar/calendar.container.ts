import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeDate, getAllTasksTrack } from '@store/common/common.actions';
import {
  allTasksTrack,
  getDate,
  getFirstDay,
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
  allTasks$ = this.store$.select(allTasksTrack);
  firstDay$ = this.store$.select(getFirstDay);

  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(getAllTasksTrack());
  }

  onChangeDate(day: number): void {
    this.store$.dispatch(changeDate({ date: day }));
  }
}
