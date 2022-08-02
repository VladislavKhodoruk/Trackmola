import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  projectsByUsers,
  getUser,
} from './../../../../store/common/common.selectors';

import { usersGroupByProject } from '@pages/projects/store/projects.selectors';
import { TeamState } from '@pages/team/store/team.state';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-users-projects-container',
  template: `<app-users-projects-component
    [pickedUser]="pickedUser$ | async"
    [projectsByUsers]="projectsByUsers$ | async"
    [usersByProject]="usersByProject$ | async"
  ></app-users-projects-component>`,
})
export class UsersProjectsContainer {
  pickedUser$ = this.teamStore$.select(getUser);

  projectsByUsers$ = this.store$.select(projectsByUsers);

  usersByProject$ = this.store$.select(usersGroupByProject);

  constructor(
    private store$: Store<TrackMolaState>,
    private teamStore$: Store<TeamState>
  ) {}
}
