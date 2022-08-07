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
  selector: 'app-report-send-modal-container',
  styleUrls: ['./report-send-modal.component.scss'],
  template: `<app-report-send-modal
    [taskTracks]="taskTracks$ | async"
    [period]="period$ | async"
    [currentDate]="currentDate$ | async"
    (submitTasksTrack)="submitReport($event)"
    (taskTrack)="putIntoStore($event)"
  ></app-report-send-modal>`,
})
export class ReportSendModalContainer {
  taskTracks$ = this.store$.select(getTasksTrack);
  currentDate$ = this.store$.select(getDate);
  period$ = this.store$.select(getPeriod);

  constructor(
    private store$: Store<TrackMolaState>,
    private commonStore$: Store<CommonState>
  ) {}

  // ngOnChanges(changes: SimpleChanges): void {
  // console.log(this.taskTracks$);
  // console.log(this.currentDate$);
  // console.log(this.tasksInfoByTaskId);
  // console.log(this.getFilteredTasksTracks());
  // console.log(this.groupByDate());
  // }

  putIntoStore(taskTrack: TaskTrack): void {
    this.store$.dispatch(putTaskTrack({ taskTrack }));
  }

  submitReport(taskstrack: TaskTrack[]) {
    taskstrack.forEach((tasktrack) =>
      this.commonStore$.dispatch(updateTaskTrack({ tasktrack }))
    );
  }
}
