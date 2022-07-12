import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@shared/interfaces/interfaces';
import { TrackMolaState } from '@store/trackMola.state';
import { Observable } from 'rxjs';
import { logout } from '@pages/authorization/store/authorization.actions';
import { getUserInfo } from '@pages/profile/store/profile.actions';
import { getProfileUser } from '@pages/profile/store/profile.selectors';

@Component({
  selector: 'app-profile-container',
  template: `<app-profile
    [userInfo]="userInfo$ | async"
    (logoutEmmiter)="onLogout()"
  >
  </app-profile>`,
})
export class ProfileContainer {
  readonly userInfo$: Observable<User> = this.store$.select(getProfileUser);

  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(getUserInfo());
  }

  onLogout() {
    this.store$.dispatch(logout());
  }
}
