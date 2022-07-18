import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
  activeTaskGroupByProject,
  activeTaskTracksGroupByTask,
  getProjectByRoute,
  usersInfoByUserId,
} from '@pages/projects/store/projects.selectors';
import {
  GroupBy,
  Project,
  Task,
  TaskTrack,
  User,
} from '@shared/interfaces/interfaces';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-active-tasks-container',
  template: `<app-active-tasks
    [project]="project$ | async"
    [activeTaskGroupByProject]="activeTaskGroupByProject$ | async"
    [activeTaskTracksGroupByTask]="activeTaskTracksGroupByTask$ | async"
    [usersInfoByUserId]="usersInfoByUserId$ | async"
  ></app-active-tasks>`,
  styleUrls: ['./active-tasks.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTasksContainer {
  readonly project$: Observable<Project> =
    this.store$.select(getProjectByRoute);

  readonly activeTaskGroupByProject$: Observable<GroupBy<Task[]>> =
    this.store$.select(activeTaskGroupByProject);

  readonly activeTaskTracksGroupByTask$: Observable<GroupBy<TaskTrack[]>> =
    this.store$.select(activeTaskTracksGroupByTask);

  readonly usersInfoByUserId$: Observable<GroupBy<User>> =
    this.store$.select(usersInfoByUserId);

  constructor(private store$: Store<TrackMolaState>) {}
}
