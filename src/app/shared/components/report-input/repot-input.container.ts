import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { getTaskTrack } from '@pages/report/store/report.selectors';
import { ReportState } from '@pages/report/store/report.state';
import { TaskTrack } from '@shared/interfaces/interfaces';
import { addTaskTrack, updateTaskTrack } from '@store/common/common.actions';
import { getProjects, getTasks, getDate } from '@store/common/common.selectors';
import { CommonState } from '@store/common/common.state';

@Component({
  selector: 'app-report-input-container',
  template: `<app-report-input
    [allProjects]="allProjects$ | async"
    [allTasks]="allTasks$ | async"
    [currentDate]="currentDate$ | async"
    [editableTaskTrack]="taskTrack$ | async"
    (editTaskTrack)="editTaskTrack($event)"
    (addCurTaskTrack)="addCurTaskTrack($event)"
  ></app-report-input>`,
})
export class ReportInputContainer {
  allTasks$ = this.reportStore$.select(getTasks);
  allProjects$ = this.reportStore$.select(getProjects);
  currentDate$ = this.commonStore$.select(getDate);
  taskTrack$ = this.reportStore$.select(getTaskTrack);

  constructor(
    private reportStore$: Store<ReportState>,
    private commonStore$: Store<CommonState>
  ) {}

  editTaskTrack(tasktrack: TaskTrack) {
    this.commonStore$.dispatch(updateTaskTrack({ tasktrack }));
  }

  addCurTaskTrack(tasktrack: TaskTrack) {
    this.commonStore$.dispatch(addTaskTrack({ tasktrack }));
  }
}
