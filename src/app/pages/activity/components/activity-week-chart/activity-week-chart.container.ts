import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, TaskTrack } from "@shared/interfaces/interfaces";
import { getMyActivityTaskTracks } from '@pages/activity/store/activity.selectors';
import { Store } from '@ngrx/store';
import { TrackMolaState } from '@store/trackMola.state';
import { getProjects } from '@store/common/common.selectors';

@Component({
  selector: 'app-activity-week-chart-container',
  template: `<app-activity-week-chart-component
    [activeTasks]="activityTasks$ | async"
    [projects]="allProjects$ | async"
  ></app-activity-week-chart-component>`,
})
export class ActivityWeekChartContainer {
  readonly activityTasks$: Observable<TaskTrack[]> = this.store$.select(
    getMyActivityTaskTracks
  );

  readonly allProjects$: Observable<Project[]> =
    this.store$.select(getProjects);

  constructor(private store$: Store<TrackMolaState>) {}
}
