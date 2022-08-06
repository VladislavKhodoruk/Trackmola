import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { logout } from '@pages/authorization/store/authorization.actions';
import { getUserInfo } from '@pages/profile/store/profile.actions';
import { getProfileUser } from '@pages/profile/store/profile.selectors';
import { User, Vacation } from '@shared/interfaces/interfaces';
import { getCurrentVacations, getUsers } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-profile-container',
  template: `<app-profile
    [userInfo]="userInfo$ | async"
    (logoutEmmiter)="onLogout()"
    [vacations]="userVacations$ | async"
    [users]="users$ | async"
  ></app-profile>`,
})
export class ProfileContainer {
  readonly userInfo$: Observable<User> = this.store$.select(getProfileUser);
  readonly userVacations$: Observable<Vacation[]> =
    this.store$.select(getCurrentVacations);

  readonly users$: Observable<User[]> = this.store$.select(getUsers);

  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(getUserInfo());
  }

  onLogout() {
    this.store$.dispatch(logout());
  }
}
