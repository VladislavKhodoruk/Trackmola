import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
  getTaskTracksDurationGroupByUser,
  getUsersWithoutCTO,
} from '@pages/dashboard/store/dashboard.selectors';
import { setUser } from '@pages/team/store/team.actions';
import { GroupBy, User } from '@shared/interfaces/interfaces';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-admin-dashboard-container',
  template: `<app-admin-dashboard
    [users]="users$ | async"
    [taskTracksDurationGroupByUser]="taskTracksDurationGroupByUser$ | async"
    (setUser)="setPickedUser($event)"
  ></app-admin-dashboard>`,
})
export class AdminDashboardContainer {
  readonly users$ = this.store$.select(getUsersWithoutCTO);
  readonly taskTracksDurationGroupByUser$: Observable<
    GroupBy<{ duration: number; overtimeDuration: number }>
  > = this.store$.select(getTaskTracksDurationGroupByUser);

  constructor(private store$: Store<TrackMolaState>) {}

  setPickedUser(user: User): void {
    this.store$.dispatch(setUser({ user }));
  }
}
