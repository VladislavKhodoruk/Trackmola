import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  setPeriod,
  setProject,
} from '@pages/report-constructor/store/report-constructor.actions';
import {
  getPeriod,
  getTaskTracks,
} from '@pages/report-constructor/store/report-constructor.selectors';
import { Period } from '@shared/interfaces/interfaces';
import {
  getProjects,
  getTasks,
  getUsers,
} from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-manager-report-constructor-container',
  template: `<app-manager-report-constructor
    [projects]="projects$ | async"
    [period]="period$ | async"
    [taskTracks]="taskTracks$ | async"
    [users]="users$ | async"
    [tasks]="tasks$ | async"
    (changeStorePeriod)="changePeriod($event)"
    (changeStoreProjectId)="changeProjectId($event)"
  ></app-manager-report-constructor>`,
})
export class ManagerReportConstructorContainer {
  @Input() userType: string;
  projects$ = this.store$.select(getProjects);
  period$ = this.store$.select(getPeriod);
  users$ = this.store$.select(getUsers);
  taskTracks$ = this.store$.select(getTaskTracks);
  tasks$ = this.store$.select(getTasks);

  constructor(private store$: Store<TrackMolaState>) {}

  changePeriod(period: Period): void {
    this.store$.dispatch(setPeriod({ period }));
  }

  changeProjectId(projectId: string): void {
    this.store$.dispatch(setProject({ projectId }));
  }
}
