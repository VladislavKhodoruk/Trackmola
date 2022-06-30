/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getActivityProjects,
  getActivityTasks,
} from '@pages/activity/store/activity.selectors';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-projects-activity-container',
  template: `<app-projects-activity
    [activityProjects]="activityProjects$ | async"
    [activityTasks]="activityTasks$ | async"
  ></app-projects-activity>`,
})
export class ProjectsActivityContainer {
  readonly activityTasks$ = this.store$.select(getActivityTasks);
  readonly activityProjects$ = this.store$.select(getActivityProjects);

  constructor(private store$: Store<TrackMolaState>) {}
}
