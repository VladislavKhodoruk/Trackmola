import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { putTaskTrack } from '@pages/report/store/report.actions';

import { getTaskTrack } from '@pages/report/store/report.selectors';
import { TaskTrack } from '@shared/interfaces/interfaces';

import { changeDate } from '@store/common/common.actions';
import {
  getDate,
  getFirstDay,
  getTasksTrackByPeriod,
} from '@store/common/common.selectors';
import { getCurrentRoute } from '@store/router/router.selector';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-calendar-container',
  template: `<app-calendar
    [date]="date$ | async"
    [numPreviousWeek]="numPreviousWeek"
    [allTasks]="allTasks$ | async"
    [firstDay]="firstDay$ | async"
    [editableTaskTrack]="taskTrack$ | async"
    [currentRoute]="currentRoute$ | async"
    (changeDate)="onChangeDate($event)"
    (taskTrack)="putIntoStore($event)"
  ></app-calendar>`,
})
export class CalendarContainer {
  @Input() numPreviousWeek = 1;
  date$ = this.store$.select(getDate);
  allTasks$ = this.store$.select(getTasksTrackByPeriod);
  firstDay$ = this.store$.select(getFirstDay);
  taskTrack$ = this.store$.select(getTaskTrack);
  currentRoute$ = this.store$.select(getCurrentRoute);

  constructor(private store$: Store<TrackMolaState>) {}

  onChangeDate(day: number): void {
    this.store$.dispatch(changeDate({ date: day }));
  }
  putIntoStore(taskTrack: TaskTrack): void {
    this.store$.dispatch(putTaskTrack({ taskTrack }));
  }
}
