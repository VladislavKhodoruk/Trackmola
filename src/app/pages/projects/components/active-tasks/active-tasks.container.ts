import { TrackMolaState } from '@store/trackMola.state';
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  activeTaskGroupByProject,
  activeTaskTracksGroupByTask,
  getProjectByRoute,
  usersInfoByUserId,
} from '@pages/projects/store/projects.selectors';
import { Project } from '@shared/interfaces/interfaces';
import { Observable } from 'rxjs';
import {
  TaskGroupByProject,
  TaskTracksGroupByTask,
  UsersGroupByUserId,
} from '@pages/projects/interfaces/interface';

@Component({
  selector: 'app-active-tasks-container',
  template: `<app-active-tasks
    [project]="project$ | async"
    [activeTaskGroupByProject]="activeTaskGroupByProject$ | async"
    [activeTaskTracksGroupByTask]="activeTaskTracksGroupByTask$ | async"
    [usersInfoByUserId]="usersInfoByUserId$ | async"
  ></app-active-tasks>`,
  styleUrls: ['./active-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTasksContainer {
  readonly project$: Observable<Project> =
    this.store$.select(getProjectByRoute);

  readonly activeTaskGroupByProject$: Observable<TaskGroupByProject> =
    this.store$.select(activeTaskGroupByProject);

  readonly activeTaskTracksGroupByTask$: Observable<TaskTracksGroupByTask> =
    this.store$.select(activeTaskTracksGroupByTask);

  readonly usersInfoByUserId$: Observable<UsersGroupByUserId> =
    this.store$.select(usersInfoByUserId);

  constructor(private store$: Store<TrackMolaState>) {}
}
