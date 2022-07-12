import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getActivityProjects,
  getActivityTasks,
} from '@pages/activity/store/activity.selectors';
import { Project, TaskTrack } from '@shared/interfaces/interfaces';

import { TrackMolaState } from '@store/trackMola.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects-activity-container',
  template: `<app-projects-activity
    [myActivityProjects]="activityProjects$ | async"
    [myActivityTaskTracks]="activityTasks$ | async"
  ></app-projects-activity>`,
})
export class ProjectsActivityContainer {
  readonly activityTasks$: Observable<TaskTrack[]> =
    this.store$.select(getActivityTasks);
  readonly activityProjects$: Observable<Project[]> =
    this.store$.select(getActivityProjects);

  constructor(private store$: Store<TrackMolaState>) {}
}
