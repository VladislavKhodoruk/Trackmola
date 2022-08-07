import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
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
  User,
  Vacation,
} from '@shared/interfaces/interfaces';
import { getUsers, getVacations } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projects-container',
  styleUrls: ['./projects.component.scss'],
  template: `<app-projects
    class="projects"
    [projectByRoute]="projectByRoute$ | async"
    [usersGroupByProject]="usersGroupByProject$ | async"
    [users]="allUsers$ | async"
    [vacations]="allVacations$ | async"
  ></app-projects>`,
})
export class ProjectsContainer implements OnDestroy {
  readonly projectByRoute$: Observable<Project> =
    this.store$.select(getProjectByRoute);

  readonly allUsers$: Observable<User[]> = this.store$.select(getUsers);

  readonly allVacations$: Observable<Vacation[]> =
    this.store$.select(getVacations);

  readonly usersGroupByProject$: Observable<GroupBy<User>> =
    this.store$.select(usersGroupByProject);

  constructor(private store$: Store<TrackMolaState>) {}

  ngOnDestroy(): void {
    this.store$.dispatch(clearProjectState());
  }
}
