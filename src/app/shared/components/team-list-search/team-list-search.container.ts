import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { setUser } from '@pages/team/store/team.actions';
import { GroupBy, Project, User } from '@shared/interfaces/interfaces';
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
    (pickUser)="setPickedUser($event)"
    (setDefaultUser)="setPickedUser($event)"
  ></app-team-list-search-component>`,
})
export class TeamListSearchContainer {
  allProjects$: Observable<Project[]> = this.commonStore$.select(getProjects);
  projectsByUsers$: Observable<GroupBy<Project[]>> =
    this.commonStore$.select(projectsByUsers);
  locations$: Observable<string[]> = this.commonStore$.select(locations);
  positions$: Observable<string[]> = this.commonStore$.select(positions);
  allUsers$: Observable<User[]> = this.commonStore$.select(getUsers);

  constructor(
    private commonStore$: Store<CommonState>,
    private store$: Store<TrackMolaState>
  ) {}

  setPickedUser(user: User): void {
    this.store$.dispatch(setUser({ user }));
  }
}
