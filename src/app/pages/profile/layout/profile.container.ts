import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackMolaState } from '@store/trackMola.state';
import { logout } from '../../authorization/store/authorization.actions';

@Component({
  selector: 'app-profile-container',
  template: `<app-profile
    [userType]="this.userType"
    (logoutEmmiter)="onLogout()"
  ></app-profile>`,
})
export class ProfileContainer {
  userType = localStorage.getItem('AuthUserType');

  constructor(private store$: Store<TrackMolaState>) {}

  onLogout() {
    this.store$.dispatch(logout());
  }
}
