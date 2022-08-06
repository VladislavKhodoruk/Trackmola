import { Component, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { putTaskTrack } from '@pages/report/store/report.actions';

import { getTaskTrack } from '@pages/report/store/report.selectors';
import { StateName } from '@shared/enums/enum';
import { TaskTrack } from '@shared/interfaces/interfaces';

import { changeDate } from '@store/common/common.actions';
import {
  getDate,
  getFirstDay,
  getTasksTrackByPeriod,
} from '@store/common/common.selectors';
import { RouterStateUrl } from '@store/router/custom-serializer';
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
@UntilDestroy()
export class CalendarContainer {
  @Input() numPreviousWeek = 1;
  date$: Observable<number> = this.store$.select(getDate);
  allTasks$: Observable<TaskTrack[]> = this.store$.select(
    getTasksTrackByPeriod
  );
  firstDay$: Observable<number> = this.store$.select(getFirstDay);
  currentRoute$: Observable<RouterStateUrl> =
    this.store$.select(getCurrentRoute);
  taskTrack$: Observable<TaskTrack>;

  constructor(private store$: Store<TrackMolaState>) {
    this.currentRoute$.pipe(untilDestroyed(this)).subscribe((item) => {
      if (item.url === `/${StateName.Report}`) {
        this.taskTrack$ = this.store$.select(getTaskTrack);
      }
    });
  }

  onChangeDate(day: number): void {
    this.store$.dispatch(changeDate({ date: day }));
  }
  putIntoStore(taskTrack: TaskTrack): void {
    this.store$.dispatch(putTaskTrack({ taskTrack }));
  }
}
