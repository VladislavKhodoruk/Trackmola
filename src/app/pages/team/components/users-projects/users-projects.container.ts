import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { usersGroupByProject } from '@pages/projects/store/projects.selectors';
import { getUser } from '@pages/team/store/team.selectors';
import { TeamState } from '@pages/team/store/team.state';
import { GroupBy, Project, User } from '@shared/interfaces/interfaces';
import { projectsByUsers } from '@store/common/common.selectors';

import { TrackMolaState } from '@store/trackMola.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-projects-container',
  template: `<app-users-projects-component
    [pickedUser]="pickedUser$ | async"
    [projectsByUsers]="projectsByUsers$ | async"
    [usersByProject]="usersByProject$ | async"
  ></app-users-projects-component>`,
})
export class UsersProjectsContainer {
  readonly pickedUser$: Observable<User> = this.teamStore$.select(getUser);

  readonly projectsByUsers$: Observable<GroupBy<Project[]>> =
    this.store$.select(projectsByUsers);

  readonly usersByProject$: Observable<GroupBy<User[]>> =
    this.store$.select(usersGroupByProject);

  constructor(
    private store$: Store<TrackMolaState>,
    private teamStore$: Store<TeamState>
  ) {}
}
