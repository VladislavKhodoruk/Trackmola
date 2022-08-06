import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { TaskForManager } from '@pages/dashboard/interfaces/interface';
import { ExcelData } from '@pages/report-constructor/interfaces/interfaces';
import {
  changeChartViewMode,
  changeViewMode,
  exportExel,
  setPeriod,
  setProject,
} from '@pages/report-constructor/store/report-constructor.actions';
import {
  getChartViewMode,
  getDateForChart,
  getPeriod,
  getTaskTracks,
  getViewMode,
} from '@pages/report-constructor/store/report-constructor.selectors';
import { ChartViewMode, ViewMode } from '@pages/report/enums/enum';
import {
  Period,
  Project,
  TaskTrack,
  User,
  Task,
  GroupBy,
} from '@shared/interfaces/interfaces';
import {
  getProjects,
  getTasks,
  getUsers,
  usersInfoByUserId,
} from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-report-constructor-container',
  template: `<app-manager-report-constructor
    [projects]="projects$ | async"
    [period]="period$ | async"
    [taskTracks]="taskTracks$ | async"
    [users]="users$ | async"
    [tasks]="tasks$ | async"
    [viewMode]="viewMode$ | async"
    [chartViewMode]="chartViewMode$ | async"
    [dateForChart]="dateForChart$ | async"
    [usersInfoByUserId]="usersInfoByUserId$ | async"
    (changeStorePeriod)="changePeriod($event)"
    (changeStoreProjectId)="changeProjectId($event)"
    (exportExel)="exportExel($event)"
    (changeViewMode)="onChangeViewMode($event)"
    (changeChartViewMode)="onChangeChartViewMode($event)"
  ></app-manager-report-constructor>`,
})
export class ManagerReportConstructorContainer {
  @Input() userType: string;
  readonly projects$: Observable<Project[]> = this.store$.select(getProjects);
  readonly period$: Observable<Period> = this.store$.select(getPeriod);
  readonly users$: Observable<User[]> = this.store$.select(getUsers);
  readonly taskTracks$: Observable<TaskTrack[]> =
    this.store$.select(getTaskTracks);
  readonly tasks$: Observable<Task[]> = this.store$.select(getTasks);
  readonly viewMode$: Observable<ViewMode> = this.store$.select(getViewMode);
  readonly chartViewMode$: Observable<ChartViewMode> =
    this.store$.select(getChartViewMode);
  readonly dateForChart$: Observable<TaskForManager[]> =
    this.store$.select(getDateForChart);
  readonly usersInfoByUserId$: Observable<GroupBy<User>> =
    this.store$.select(usersInfoByUserId);

  constructor(private store$: Store<TrackMolaState>) {}

  protected changePeriod(period: Period): void {
    this.store$.dispatch(setPeriod({ period }));
  }

  protected changeProjectId(projectId: string): void {
    this.store$.dispatch(setProject({ projectId }));
  }

  protected exportExel(data: ExcelData): void {
    this.store$.dispatch(exportExel({ data }));
  }

  protected onChangeViewMode(viewMode: ViewMode): void {
    this.store$.dispatch(changeViewMode({ viewMode }));
  }

  protected onChangeChartViewMode(chartViewMode: ChartViewMode): void {
    this.store$.dispatch(changeChartViewMode({ chartViewMode }));
  }
}
