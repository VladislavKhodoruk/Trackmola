import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { putTaskTrack } from '@pages/report/store/report.actions';
import { TaskTrack } from '@shared/interfaces/interfaces';
import { updateTaskTrack } from '@store/common/common.actions';
import {
  getTasksTrack,
  getDate,
  getPeriod,
} from '@store/common/common.selectors';
import { CommonState } from '@store/common/common.state';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-approve-modal-container',
  styleUrls: ['./approve-modal.component.scss'],
  template: `<app-approve-modal
    [currentDate]="currentDate$ | async"
    [taskTracks]="taskTracks$ | async"
    [period]="period$ | async"
    (submitTasksTrack)="submitReport($event)"
    (taskTrack)="putIntoStore($event)"
  ></app-approve-modal>`,
})
export class ApproveModalContainer {
  taskTracks$ = this.store$.select(getTasksTrack);
  currentDate$ = this.store$.select(getDate);
  period$ = this.store$.select(getPeriod);

  constructor(
    private store$: Store<TrackMolaState>,

    private commonStore$: Store<CommonState>
  ) {}

  putIntoStore(taskTrack: TaskTrack): void {
    this.store$.dispatch(putTaskTrack({ taskTrack }));
  }

  submitReport(taskstrack: TaskTrack[]) {
    taskstrack.forEach((tasktrack) =>
      this.commonStore$.dispatch(updateTaskTrack({ tasktrack }))
    );
  }
}
