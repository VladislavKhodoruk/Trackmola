import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { putTaskTrack } from '../store/report.actions';

import { TaskTrack } from '@shared/interfaces/interfaces';
import { updateTaskTrack } from '@store/common/common.actions';

import { getDate, getTasksTrack } from '@store/common/common.selectors';
import { CommonState } from '@store/common/common.state';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-report-container',
  template: `<app-report
    [currentDate]="currentDate$ | async"
    [taskTracks]="taskTracks$ | async"
    (submitTasksTrack)="submitReport($event)"
    (taskTrack)="putIntoStore($event)"
  ></app-report>`,
})
export class ReportContainer {
  taskTracks$ = this.store$.select(getTasksTrack);
  currentDate$ = this.store$.select(getDate);

  putIntoStore(taskTrack: TaskTrack): void {
    this.store$.dispatch(putTaskTrack({ taskTrack }));
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private store$: Store<TrackMolaState>,
    private commonStore$: Store<CommonState>
  ) {}

  submitReport(taskstrack: TaskTrack[]) {
    taskstrack.forEach((tasktrack) =>
      this.commonStore$.dispatch(updateTaskTrack({ tasktrack }))
    );
  }
}
