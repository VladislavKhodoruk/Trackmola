import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { setUser } from '@pages/team/store/team.actions';
import { User } from '@shared/interfaces/interfaces';

import {
  getProjects,
  getUsers,
  locations,
  positions,
  projectsByUsers,
} from '@store/common/common.selectors';
import { CommonState } from '@store/common/common.state';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-team-list-search-container',
  template: `<app-team-list-search-component
    [allProjects]="allProjects$ | async"
    [projectsByUsers]="projectsByUsers$ | async"
    [locations]="locations$ | async"
    [positions]="positions$ | async"
    [allUsers]="allUsers$ | async"
    (pickedUser)="setPickedUser($event)"
    (setDefaultUser)="setPickedUser($event)"
  ></app-team-list-search-component>`,
})
export class TeamListSearchContainer {
  allProjects$ = this.commonStore$.select(getProjects);
  projectsByUsers$ = this.commonStore$.select(projectsByUsers);
  locations$ = this.commonStore$.select(locations);
  positions$ = this.commonStore$.select(positions);
  allUsers$ = this.commonStore$.select(getUsers);

  constructor(
    private commonStore$: Store<CommonState>,
    private store$: Store<TrackMolaState>
  ) {}

  setPickedUser(user: User): void {
    this.store$.dispatch(setUser({ user }));
  }
}
