import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ManagerDashboardView } from '@pages/dashboard/enums/enum';
import { TaskForManager } from '@pages/dashboard/interfaces/interface';
import {
  getActiveProjectFilter,
  getTasksForManager,
  getModeView,
  getManagerDashboardPeriod,
} from '@pages/dashboard/store/dashboard.selectors';

import {
  GroupBy,
  Period,
  Project,
  User,
  Vacation,
} from '@shared/interfaces/interfaces';
import {
  getUsers,
  getVacations,
  usersInfoByUserId,
} from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-dashboard-container',
  styleUrls: ['./manager-dashboard.container.scss'],
  template: `<app-manager-dashboard
    [vacations]="allVacations$ | async"
    [activeProjectFilter]="activeProjectFilter$ | async"
    [tasksForManager]="tasksForManager$ | async"
    [usersInfoByUserId]="usersInfoByUserId$ | async"
    [modeView]="modeView$ | async"
    [period]="period$ | async"
    [users]="allUsers$ | async"
  ></app-manager-dashboard>`,
})
export class ManagerDashboardContainer {
  readonly allUsers$: Observable<User[]> = this.store$.select(getUsers);

  readonly activeProjectFilter$: Observable<Project> = this.store$.select(
    getActiveProjectFilter
  );

  readonly allVacations$: Observable<Vacation[]> =
    this.store$.select(getVacations);

  readonly tasksForManager$: Observable<TaskForManager[]> =
    this.store$.select(getTasksForManager);

  readonly usersInfoByUserId$: Observable<GroupBy<User>> =
    this.store$.select(usersInfoByUserId);

  readonly modeView$: Observable<ManagerDashboardView> =
    this.store$.select(getModeView);

  readonly period$: Observable<Period> = this.store$.select(
    getManagerDashboardPeriod
  );

  constructor(private store$: Store<TrackMolaState>) {}
}
