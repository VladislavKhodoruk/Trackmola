import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loading } from 'src/app/store/shared/shared.actions';
import {
  getErrorMessage,
  getLoading,
} from 'src/app/store/shared/shared.selectors';
import { TrackMolaState } from 'src/app/store/trackMola.state';
import { AuthorizationForm } from '../../interfaces/interface';
import { loginStart } from '../../store/authrorization.actions';

@Component({
  template: `<app-login
    [loading]="this.loading$ | async"
    [errorMessage]="this.errorMessage$ | async"
    (startLoading)="onStartLoading()"
    (loginStart)="onLoginStart($event)"
  ></app-login>`,
})
export class LoginContainer {
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  constructor(private store: Store<TrackMolaState>) {
    this.loading$ = this.store.select(getLoading);
    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  onStartLoading() {
    this.store.dispatch(loading({ status: true }));
  }
  onLoginStart({ email, password }: AuthorizationForm) {
    this.store.dispatch(loginStart({ email, password }));
  }
}
