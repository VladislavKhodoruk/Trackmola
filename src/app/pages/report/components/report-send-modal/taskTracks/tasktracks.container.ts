import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { tasksInfoByTaskId } from '@pages/projects/store/projects.selectors';
import { projectsInfoByProjectId } from '@pages/report/store/report.selectors';
import { getTasksTrack, getPeriod } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-tasktracks-container',
  template: `<app-tasktracks
    [projectsInfoByProjectId]="projectsInfoByProjectId$ | async"
    [tasksInfoByTaskId]="tasksInfoByTaskId$ | async"
    [taskTracks]="taskTracks$ | async"
    [period]="period$ | async"
  ></app-tasktracks>`,
})
export class TaskTracksContainer {
  readonly taskTracks$: Observable<any> = this.store$.select(getTasksTrack);

  readonly projectsInfoByProjectId$: Observable<any> = this.store$.select(
    projectsInfoByProjectId
  );
  readonly period$: Observable<any> = this.store$.select(getPeriod);

  readonly tasksInfoByTaskId$: Observable<any> =
    this.store$.select(tasksInfoByTaskId);

  constructor(private store$: Store<TrackMolaState>) {}
}
