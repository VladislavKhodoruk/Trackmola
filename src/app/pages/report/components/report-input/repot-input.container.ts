import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReportState } from '@pages/report/store/report.state';
import { getProjects, getTasks } from '@store/common/common.selectors';
import { getDate } from '@store/common/common.selectors';
import { CommonState } from '@store/common/common.state';

@Component({
  selector: 'app-report-input-container',
  template: `<app-report-input
    [allProjects]="allProjects$ | async"
    [allTasks]="allTasks$ | async"
    [currentDate]="currentDate$ | async"
  ></app-report-input>`,
})
export class ReportInputContainer {
  allTasks$ = this.reportStore$.select(getTasks);
  allProjects$ = this.reportStore$.select(getProjects);
  currentDate$ = this.commonStore$.select(getDate);

  constructor(
    private reportStore$: Store<ReportState>,
    private commonStore$: Store<CommonState>
  ) {}
}
