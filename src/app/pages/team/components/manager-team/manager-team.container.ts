import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { usersGroupByProject } from '@pages/projects/store/projects.selectors';
import {
  getUser,
  getVacationsForPickTeamMember,
} from '@pages/team/store/team.selectors';
import { TeamState } from '@pages/team/store/team.state';
import {
  GroupBy,
  Project,
  User,
  Vacation,
} from '@shared/interfaces/interfaces';
import {
  getUsers,
  projectsByUsers,
  trackedTimeByProjects,
} from '@store/common/common.selectors';
import { CommonState } from '@store/common/common.state';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-manager-team-container',
  template: `<app-manager-team-component
    [pickedUser]="pickedUser$ | async"
    [projectsByUsers]="projectsByUsers$ | async"
    [usersByProject]="usersByProject$ | async"
    [trackedTimeByProjects]="trackedTimeByProjects$ | async"
    [vacations]="pickUserVacations$ | async"
    [users]="users$ | async"
  ></app-manager-team-component>`,
})
export class ManagerTeamContainer {
  readonly pickedUser$: Observable<User> = this.teamStore$.select(getUser);

  readonly projectsByUsers$: Observable<GroupBy<Project[]>> =
    this.store$.select(projectsByUsers);

  readonly usersByProject$: Observable<GroupBy<User[]>> =
    this.store$.select(usersGroupByProject);

  readonly trackedTimeByProjects$: Observable<GroupBy<number>> =
    this.commonStore$.select(trackedTimeByProjects);

  readonly pickUserVacations$: Observable<Vacation[]> =
    this.commonStore$.select(getVacationsForPickTeamMember);

  readonly users$: Observable<User[]> = this.store$.select(getUsers);

  constructor(
    private store$: Store<TrackMolaState>,
    private teamStore$: Store<TeamState>,
    private commonStore$: Store<CommonState>
  ) {}
}
