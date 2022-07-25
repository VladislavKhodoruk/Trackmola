import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
  activeTaskGroupByProject,
  activeTaskTracksDurationGroupByTask,
  getProjectByRoute,
  tasksInfoByTaskId,
} from '@pages/projects/store/projects.selectors';
import { GroupBy, Project, Task } from '@shared/interfaces/interfaces';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-active-tasks-user-mode-container',
  styleUrls: ['./active-tasks-user-mode.container.scss'],
  template: `<app-active-tasks-user-mode
    [project]="project$ | async"
    [activeTaskGroupByProject]="activeTaskGroupByProject$ | async"
    [activeTaskTracksDurationGroupByTask]="
      activeTaskTracksDurationGroupByTask$ | async
    "
    [tasksInfoByTaskId]="tasksInfoByTaskId$ | async"
  ></app-active-tasks-user-mode>`,
})
export class ActiveTasksUserModeContainer {
  readonly project$: Observable<Project> =
    this.store$.select(getProjectByRoute);

  readonly activeTaskGroupByProject$: Observable<GroupBy<Task[]>> =
    this.store$.select(activeTaskGroupByProject);

  readonly activeTaskTracksDurationGroupByTask$: Observable<GroupBy<number>> =
    this.store$.select(activeTaskTracksDurationGroupByTask);

  readonly tasksInfoByTaskId$: Observable<GroupBy<Task[]>> =
    this.store$.select(tasksInfoByTaskId);

  constructor(private store$: Store<TrackMolaState>) {}
}
