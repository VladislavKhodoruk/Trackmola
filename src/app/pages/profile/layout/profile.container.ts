import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserType } from '@store/shared/shared.selectors';
import { TrackMolaState } from '@store/trackMola.state';
import { logout } from '../../authorization/store/authorization.actions';

@Component({
  selector: 'app-profile-container',
  template: `<app-profile
    [userType]="this.userType$ | async"
    (logoutEmmiter)="onLogout()"
  ></app-profile>`,
})
export class ProfileContainer {
  userType$ = this.store$.select(getUserType);

  constructor(private store$: Store<TrackMolaState>) {}

  onLogout() {
    this.store$.dispatch(logout());
  }
}
