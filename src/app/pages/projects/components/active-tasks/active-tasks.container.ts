import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { addTask } from '@pages/projects/store/projects.actions';
import {
  activeTaskGroupByProject,
  activeTaskTracksGroupByTask,
  getProjectByRoute,
} from '@pages/projects/store/projects.selectors';
import {
  GroupBy,
  Project,
  Task,
  TaskTrack,
  User,
} from '@shared/interfaces/interfaces';

import { usersInfoByUserId } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-active-tasks-container',
  styleUrls: ['./active-tasks.container.scss'],
  template: `<app-active-tasks
    [project]="project$ | async"
    [activeTaskGroupByProject]="activeTaskGroupByProject$ | async"
    [activeTaskTracksGroupByTask]="activeTaskTracksGroupByTask$ | async"
    [usersInfoByUserId]="usersInfoByUserId$ | async"
    (addTask)="addTask($event)"
  ></app-active-tasks>`,
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

  addTask(task: Task): void {
    this.store$.dispatch(addTask({ task }));
  }
}
