import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '@pages/authorization/store/authorization.actions';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-profile-container',
  template: `<app-profile
    [userType]="this.userType"
    (logout)="onLogout()"
  ></app-profile>`,
})
export class ProfileContainer {
  userType = localStorage.getItem('AuthUserType');

  constructor(private store$: Store<TrackMolaState>) {}

  onLogout() {
    this.store$.dispatch(logout());
  }
}
