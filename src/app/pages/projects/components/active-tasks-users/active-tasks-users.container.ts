import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
  activeTaskTracksGroupByUser,
  activeUserGroupByProject,
  getProjectByRoute,
  tasksInfoByTaskId,
  sendedTaskTracksGroupByUser,
} from '@pages/projects/store/projects.selectors';
import { putTaskTrack } from '@pages/report/store/report.actions';
import {
  GroupBy,
  Project,
  TaskTrack,
  Task,
  User,
} from '@shared/interfaces/interfaces';

import { updateTaskTrack } from '@store/common/common.actions';
import { getTasksTrack } from '@store/common/common.selectors';
import { CommonState } from '@store/common/common.state';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-active-tasks-users-container',
  styleUrls: ['./active-tasks-users.container.scss'],
  template: `<app-active-tasks-users
    [project]="project$ | async"
    [activeUserGroupByProject]="activeUserGroupByProject$ | async"
    [activeTaskTracksGroupByUser]="activeTaskTracksGroupByUser$ | async"
    [sendedTaskTracksGroupByUser]="sendedTaskTracksGroupByUser$ | async"
    [tasksInfoByTaskId]="tasksInfoByTaskId$ | async"
    [taskTracks]="taskTracks$ | async"
    (submitTasksTrack)="approveAll($event)"
    (taskTrack)="putIntoStore($event)"
  ></app-active-tasks-users>`,
})
export class ActiveTasksUsersContainer {
  readonly project$: Observable<Project> =
    this.store$.select(getProjectByRoute);

  taskTracks$ = this.store$.select(getTasksTrack);

  readonly activeUserGroupByProject$: Observable<GroupBy<User>> =
    this.store$.select(activeUserGroupByProject);

  readonly activeTaskTracksGroupByUser$: Observable<GroupBy<TaskTrack[]>> =
    this.store$.select(activeTaskTracksGroupByUser);

  readonly sendedTaskTracksGroupByUser$: Observable<GroupBy<TaskTrack[]>> =
    this.store$.select(sendedTaskTracksGroupByUser);

  readonly tasksInfoByTaskId$: Observable<GroupBy<Task[]>> =
    this.store$.select(tasksInfoByTaskId);

  constructor(
    private store$: Store<TrackMolaState>,
    private commonStore$: Store<CommonState>
  ) {}

  putIntoStore(taskTrack: TaskTrack): void {
    this.store$.dispatch(putTaskTrack({ taskTrack }));
  }

  approveAll(taskstrack: TaskTrack[]): void {
    taskstrack.forEach((tasktrack) =>
      this.commonStore$.dispatch(updateTaskTrack({ tasktrack }))
    );
  }
}
