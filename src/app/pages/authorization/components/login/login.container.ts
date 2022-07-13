import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthorizationForm } from '@pages/authorization/interfaces/interface';
import { loginStart } from '@pages/authorization/store/authorization.actions';
import { loading } from '@store/common/common.actions';
import { getErrorMessage, getLoading } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  template: `<app-login
    [loading]="loading$ | async"
    [errorMessage]="errorMessage$ | async"
    (startLoading)="onStartLoading()"
    (loginStart)="onLoginStart($event)"
  ></app-login>`,
})
export class LoginContainer {
  loading$ = this.store$.select(getLoading);
  errorMessage$ = this.store$.select(getErrorMessage);

  constructor(private store$: Store<TrackMolaState>) {}

  onStartLoading() {
    this.store$.dispatch(loading({ status: true }));
  }
  onLoginStart({ email, password }: AuthorizationForm) {
    this.store$.dispatch(loginStart({ email, password }));
  }
}
