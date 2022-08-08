import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { tasksInfoByTaskId } from '@pages/projects/store/projects.selectors';
import { projectsInfoByProjectId } from '@pages/report/store/report.selectors';
import { getTasksTrack, getPeriod } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-report-send-tasktracks-container',
  template: `<app-report-send-tasktracks
    [projectsInfoByProjectId]="projectsInfoByProjectId$ | async"
    [tasksInfoByTaskId]="tasksInfoByTaskId$ | async"
    [taskTracks]="taskTracks$ | async"
    [period]="period$ | async"
  ></app-report-send-tasktracks>`,
})
export class TaskTracksContainer {
  taskTracks$ = this.store$.select(getTasksTrack);
  projectsInfoByProjectId$ = this.store$.select(projectsInfoByProjectId);
  period$ = this.store$.select(getPeriod);
  tasksInfoByTaskId$ = this.store$.select(tasksInfoByTaskId);

  constructor(private store$: Store<TrackMolaState>) {}
}
