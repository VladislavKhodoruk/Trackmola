import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
  setPeriod,
  setProject,
} from '@pages/report-constructor/store/report-constructor.actions';
import {
  getPeriod,
  getTaskTracks,
} from '@pages/report-constructor/store/report-constructor.selectors';
import {
  Period,
  Project,
  TaskTrack,
  User,
  Task,
} from '@shared/interfaces/interfaces';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerReportConstructorContainer {
  @Input() userType: string;
  projects$: Observable<Project[]> = this.store$.select(getProjects);
  period$: Observable<Period> = this.store$.select(getPeriod);
  users$: Observable<User[]> = this.store$.select(getUsers);
  taskTracks$: Observable<TaskTrack[]> = this.store$.select(getTaskTracks);
  tasks$: Observable<Task[]> = this.store$.select(getTasks);

  constructor(private store$: Store<TrackMolaState>) {}

  changePeriod(period: Period): void {
    this.store$.dispatch(setPeriod({ period }));
  }

  changeProjectId(projectId: string): void {
    this.store$.dispatch(setProject({ projectId }));
  }
}
