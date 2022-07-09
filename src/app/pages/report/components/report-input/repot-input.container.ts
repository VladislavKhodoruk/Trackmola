import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getAllProjectsData,
  getAllTasksData,
  getTaskTrack,
} from '@pages/report/store/report.selectors';
import { ReportState } from '@pages/report/store/report.state';
import { getDate } from '@store/common/common.selectors';
import { CommonState } from '@store/common/common.state';

@Component({
  selector: 'app-report-input-container',
  template: `<app-report-input
    [allProjects]="allProjects$ | async"
    [allTasks]="allTasks$ | async"
    [currentDate]="currentDate$ | async"
    [editableTaskTrack]="taskTrack$ | async"
  ></app-report-input>`,
})
export class ReportInputContainer {
  allTasks$ = this.reportStore$.select(getAllTasksData);
  allProjects$ = this.reportStore$.select(getAllProjectsData);
  currentDate$ = this.commonStore$.select(getDate);
  taskTrack$ = this.reportStore$.select(getTaskTrack);

  constructor(
    private reportStore$: Store<ReportState>,
    private commonStore$: Store<CommonState>
  ) {}
}
