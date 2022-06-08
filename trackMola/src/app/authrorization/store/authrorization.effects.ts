import { Store } from '@ngrx/store';
import {
  getType,
  loginStart,
  loginSuccess,
  logout,
} from './authrorization.actions';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.services';
import { TrackMolaState } from 'src/app/store/trackMola.state';
import { errorMessage, loading } from 'src/app/store/common.actions';
import { Router } from '@angular/router';
import { FireStoreResponce } from 'src/app/common/interfaces';

@Injectable()
export class AuthrorizationEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(loading({ status: false }));
            this.store.dispatch(errorMessage({ message: '' }));
            const user = this.authService.createUser(data);
            return getType({ user: user });
          }),
          catchError((error) => {
            this.store.dispatch(loading({ status: false }));
            const message = error.error.error.message;
            this.store.dispatch(errorMessage({ message: message }));
            return of();
          })
        )
      )
    )
  );

  getType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getType),
      mergeMap((action) => {
        const userId = action.user.localId;
        const user = action.user;
        return this.authService.getUserInfo(userId).pipe(
          map((data: FireStoreResponce) => {
            const userInfo = this.authService.createUserInfo(data);
            return loginSuccess({ user, userInfo: userInfo });
          })
        );
      })
    )
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap((data) => {
          void this.router.navigate([`${data.userInfo['type']}`]);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        map(() => {
          void this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<TrackMolaState>,
    private router: Router
  ) {}
}
