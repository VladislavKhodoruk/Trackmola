import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { TaskForManager } from '@pages/dashboard/interfaces/interface';
import { setActiveTask } from '@pages/dashboard/store/dashboard.actions';
import {
  getTasksForManager,
  getManagerProjectsFilter,
  getActiveTask,
} from '@pages/dashboard/store/dashboard.selectors';
import { Project } from '@shared/interfaces/interfaces';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-manager-dashboard-chart-container',
  styleUrls: ['./manager-dashboard-chart.container.scss'],
  template: `<app-manager-dashboard-chart
    [managerProjectsFilter]="managerProjectsFilter$ | async"
    [tasksForManager]="tasksForManager$ | async"
    [activeTask]="activeTask$ | async"
    (selectTask)="onSelectTask($event)"
  ></app-manager-dashboard-chart>`,
})
export class ManagerDashboardChartContainer {
  readonly managerProjectsFilter$: Observable<Project[]> = this.store$.select(
    getManagerProjectsFilter
  );

  readonly tasksForManager$: Observable<TaskForManager[]> =
    this.store$.select(getTasksForManager);

  readonly activeTask$: Observable<TaskForManager> =
    this.store$.select(getActiveTask);

  constructor(private store$: Store<TrackMolaState>) {}

  protected onSelectTask(task: TaskForManager): void {
    this.store$.dispatch(setActiveTask({ task }));
  }
}
