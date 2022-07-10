import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getProjects, getTasks, getDate } from '@store/common/common.selectors';
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
  allTasks$ = this.commonStore$.select(getTasks);
  allProjects$ = this.commonStore$.select(getProjects);
  currentDate$ = this.commonStore$.select(getDate);

  constructor(private commonStore$: Store<CommonState>) {}
}
