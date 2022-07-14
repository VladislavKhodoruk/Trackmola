import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
  getMyActivityProjects,
  getMyActivityTaskTracks,
} from '@pages/activity/store/activity.selectors';
import { Project, TaskTrack } from '@shared/interfaces/interfaces';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-projects-activity-container',
  template: `<app-projects-activity
    [myActivityProjects]="activityProjects$ | async"
    [myActivityTaskTracks]="activityTasks$ | async"
  ></app-projects-activity>`,
})
export class ProjectsActivityContainer {
  readonly activityTasks$: Observable<TaskTrack[]> = this.store$.select(
    getMyActivityTaskTracks
  );
  readonly activityProjects$: Observable<Project[]> = this.store$.select(
    getMyActivityProjects
  );

  constructor(private store$: Store<TrackMolaState>) {}
}
