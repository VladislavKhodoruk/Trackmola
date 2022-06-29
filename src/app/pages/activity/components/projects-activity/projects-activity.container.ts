/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getActivityProjects } from '@pages/activity/store/activity.selectors';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-projects-activity-container',
  template: `<app-projects-activity
    [activityProjects]="activityProjects$ | async"
    [myData]="myData"
  ></app-projects-activity>`,
})
export class ProjectsActivityContainer {
  myData = [
    ['PSVOD', 58.9],
    ['MDM', 13.29],
    ['PAT', 13],
  ];

  readonly activityProjects$ = this.store$.select(getActivityProjects);

  constructor(private store$: Store<TrackMolaState>) {}
}
