import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
  usersGroupByProject,
} from '@store/common/common.selectors';
import { CommonState } from '@store/common/common.state';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-admin-team-container',
  template: `<app-admin-team-component
    [pickedUser]="pickedUser$ | async"
    [projectsByUsers]="projectsByUsers$ | async"
    [usersByProject]="usersByProject$ | async"
    [trackedTimeByProjects]="trackedTimeByProjects$ | async"
    [vacations]="pickUserVacations$ | async"
    [users]="users$ | async"
  ></app-admin-team-component>`,
})
export class AdminTeamContainer {
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
