/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getMyActivityProjects,
  getMyActivityTaskTracks,
} from '@pages/activity/store/activity.selectors';
import { Project, TaskTrack } from '@shared/interfaces/interfaces';

import { TrackMolaState } from '@store/trackMola.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects-activity-container',
  template: `<app-projects-activity
    [myActivityProjects]="myActivityProjects$ | async"
    [myActivityTaskTracks]="myActivityTaskTracks$ | async"
  ></app-projects-activity>`,
})
export class ProjectsActivityContainer {
  readonly myActivityTaskTracks$: Observable<TaskTrack[]> = this.store$.select(
    getMyActivityTaskTracks
  );
  readonly myActivityProjects$: Observable<Project[]> = this.store$.select(
    getMyActivityProjects
  );

  constructor(private store$: Store<TrackMolaState>) {}
}
