import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, map, of, tap, Observable, switchMap } from 'rxjs';

import { loginStart, loginSuccess, logout } from './authorization.actions';

import { FirebaseCodeError } from '@pages/authorization/interfaces/interface';
import { AuthorizationService } from '@pages/authorization/services/authorization.service';
import {
  errorMessage,
  getUserData,
  loading,
} from '@store/common/common.actions';
import { TrackMolaState } from '@store/trackMola.state';

@Injectable()
export class AuthorizationEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStart),
      switchMap((action) =>
        this.authorizationService.login(action.email, action.password).pipe(
          map((data) => {
            this.store$.dispatch(loading({ status: false }));
            this.store$.dispatch(errorMessage({ loaded: true, message: '' }));
            localStorage.setItem('AuthUserId', data.user.uid);
            return loginSuccess();
          }),
          catchError((error: FirebaseCodeError) => {
            this.store$.dispatch(loading({ status: false }));
            const message = this.authorizationService.authorizationError(
              error.code
            );
            this.store$.dispatch(errorMessage({ loaded: false, message }));
            return of();
          })
        )
      )
    )
  );

  getUserData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap((): boolean => {
          this.store$.dispatch(getUserData());
          return true;
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap((): Observable<void> => {
          this.router.navigate(['']);
          return this.authorizationService.logout();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authorizationService: AuthorizationService,
    private store$: Store<TrackMolaState>,
    private router: Router
  ) {}
}
