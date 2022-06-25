import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loading } from '@store/shared/shared.actions';
import { getErrorMessage, getLoading } from '@store/shared/shared.selectors';
import { TrackMolaState } from '@store/trackMola.state';
import { AuthorizationForm } from '../../interfaces/interface';
import { loginStart } from '../../store/authorization.actions';

@Component({
  template: `<app-login
    [loading]="this.loading$ | async"
    [errorMessage]="this.errorMessage$ | async"
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
