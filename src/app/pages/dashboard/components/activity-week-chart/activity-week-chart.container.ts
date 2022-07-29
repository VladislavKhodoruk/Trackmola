import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { getMyActivityTaskTracks } from '@pages/activity/store/activity.selectors';
import { getWeekActiveTasks } from '@pages/dashboard/store/dashboard.selectors';
import { Project, TaskTrack } from '@shared/interfaces/interfaces';
import { getProjects } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-activity-week-chart-container',
  template: `<app-activity-week-chart-component
    [activeTasks]="activityTasks$ | async"
    [projects]="allProjects$ | async"
  ></app-activity-week-chart-component>`,
})
export class ActivityWeekChartContainer {
  readonly activityTasks$: Observable<TaskTrack[]> =
    this.store$.select(getWeekActiveTasks);

  readonly allProjects$: Observable<Project[]> =
    this.store$.select(getProjects);

  constructor(private store$: Store<TrackMolaState>) {}
}
