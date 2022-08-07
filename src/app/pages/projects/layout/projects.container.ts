import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { clearProjectState } from '../store/projects.actions';

import {
  getProjectByRoute,
  usersGroupByProject,
} from '@pages/projects/store/projects.selectors';
import {
  GroupBy,
  Project,
  TaskTrack,
  User,
} from '@shared/interfaces/interfaces';
import { getDate, getTasksTrack } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projects-container',
  styleUrls: ['./projects.component.scss'],
  template: `<app-projects
    class="projects"
    [projectByRoute]="projectByRoute$ | async"
    [taskTracks]="taskTracks$ | async"
    [currentDate]="currentDate$ | async"
    [usersGroupByProject]="usersGroupByProject$ | async"
  ></app-projects>`,
})
export class ProjectsContainer implements OnDestroy {
  readonly projectByRoute$: Observable<Project> =
    this.store$.select(getProjectByRoute);

  readonly usersGroupByProject$: Observable<GroupBy<User>> =
    this.store$.select(usersGroupByProject);

  readonly taskTracks$: Observable<TaskTrack[]> =
    this.store$.select(getTasksTrack);

  currentDate$ = this.store$.select(getDate);

  constructor(private store$: Store<TrackMolaState>) {}

  ngOnDestroy(): void {
    this.store$.dispatch(clearProjectState());
  }
}
