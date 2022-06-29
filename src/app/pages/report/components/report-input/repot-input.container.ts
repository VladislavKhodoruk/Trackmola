import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getAllProjectsData,
  getAllTasksData,
} from '@pages/report/store/report.selectors';
import { ReportState } from '@pages/report/store/report.state';
import { getDate } from '@store/shared/shared.selectors';
import { SharedState } from '@store/shared/shared.state';

@Component({
  selector: 'app-report-input-container',
  template: `<app-report-input
    [allProjects]="allProjects$ | async"
    [allTasks]="allTasks$ | async"
    [currentDate]="currentDate$ | async"
  ></app-report-input>`,
})
export class ReportInputContainer {
  allTasks$ = this.reportStore$.select(getAllTasksData);
  allProjects$ = this.reportStore$.select(getAllProjectsData);
  currentDate$ = this.sharedStore$.select(getDate);

  constructor(
    private reportStore$: Store<ReportState>,
    private sharedStore$: Store<SharedState>
  ) {}
}
