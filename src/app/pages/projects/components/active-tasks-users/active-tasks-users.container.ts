import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
  activeTaskTracksGroupByUser,
  activeUserGroupByProject,
  getProjectByRoute,
  tasksInfoByTaskId,
} from '@pages/projects/store/projects.selectors';
import {
  GroupBy,
  Project,
  TaskTrack,
  Task,
  User,
} from '@shared/interfaces/interfaces';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-active-tasks-users-container',
  styleUrls: ['./active-tasks-users.container.scss'],
  template: `<app-active-tasks-users
    [project]="project$ | async"
    [activeUserGroupByProject]="activeUserGroupByProject$ | async"
    [activeTaskTracksGroupByUser]="activeTaskTracksGroupByUser$ | async"
    [tasksInfoByTaskId]="tasksInfoByTaskId$ | async"
  ></app-active-tasks-users>`,
})
export class ActiveTasksUsersContainer {
  readonly project$: Observable<Project> =
    this.store$.select(getProjectByRoute);

  readonly activeUserGroupByProject$: Observable<GroupBy<User>> =
    this.store$.select(activeUserGroupByProject);

  readonly activeTaskTracksGroupByUser$: Observable<GroupBy<TaskTrack[]>> =
    this.store$.select(activeTaskTracksGroupByUser);

  readonly tasksInfoByTaskId$: Observable<GroupBy<Task[]>> =
    this.store$.select(tasksInfoByTaskId);

  constructor(private store$: Store<TrackMolaState>) {}
}
