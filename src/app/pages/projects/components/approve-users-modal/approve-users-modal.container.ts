import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
  activeTaskTracksGroupByUser,
  activeUserGroupByProject,
  getProjectByRoute,
  sendedTaskTracksGroupByUser,
  tasksInfoByTaskId,
} from '@pages/projects/store/projects.selectors';
import { putTaskTrack } from '@pages/report/store/report.actions';
import {
  GroupBy,
  Project,
  TaskTrack,
  User,
} from '@shared/interfaces/interfaces';
import { updateTaskTrack } from '@store/common/common.actions';
import {
  getTasksTrack,
  getDate,
  getPeriod,
} from '@store/common/common.selectors';
import { CommonState } from '@store/common/common.state';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-approve-users-modal-container',
  styleUrls: ['./approve-users-modal.component.scss'],
  template: `<app-approve-users-modal
    [project]="project$ | async"
    (submitTasksTrack)="approveAll($event)"
    [currentDate]="currentDate$ | async"
    [taskTracks]="taskTracks$ | async"
    [sendedTaskTracksGroupByUser]="sendedTaskTracksGroupByUser$ | async"
    [activeUserGroupByProject]="activeUserGroupByProject$ | async"
    [tasksInfoByTaskId]="tasksInfoByTaskId$ | async"
    [activeTaskTracksGroupByUser]="activeTaskTracksGroupByUser$ | async"
    [period]="period$ | async"
    (taskTrack)="putIntoStore($event)"
  ></app-approve-users-modal>`,
})
export class ApproveUsersModalContainer {
  readonly project$: Observable<Project> =
    this.store$.select(getProjectByRoute);
  taskTracks$ = this.store$.select(getTasksTrack);
  currentDate$ = this.store$.select(getDate);
  period$ = this.store$.select(getPeriod);

  readonly sendedTaskTracksGroupByUser$: Observable<GroupBy<TaskTrack[]>> =
    this.store$.select(sendedTaskTracksGroupByUser);

  readonly activeUserGroupByProject$: Observable<GroupBy<User>> =
    this.store$.select(activeUserGroupByProject);

  readonly tasksInfoByTaskId$: Observable<GroupBy<Task[]>> =
    this.store$.select(tasksInfoByTaskId);

  readonly activeTaskTracksGroupByUser$: Observable<GroupBy<TaskTrack[]>> =
    this.store$.select(activeTaskTracksGroupByUser);

  constructor(
    private store$: Store<TrackMolaState>,
    private commonStore$: Store<CommonState>
  ) {}

  putIntoStore(taskTrack: TaskTrack): void {
    this.store$.dispatch(putTaskTrack({ taskTrack }));
  }

  approveAll(taskstrack: TaskTrack[]) {
    taskstrack.forEach((tasktrack) =>
      this.commonStore$.dispatch(updateTaskTrack({ tasktrack }))
    );
  }
}
