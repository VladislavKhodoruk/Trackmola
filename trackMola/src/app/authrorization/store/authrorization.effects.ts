import { Store } from '@ngrx/store';
import { loginStart, loginSuccess, logout } from './authrorization.actions';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.services';
import { TrackMolaState } from 'src/app/store/trackMola.state';
import { errorMessage, loading } from 'src/app/store/common.actions';
import { Router } from '@angular/router';

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
            return loginSuccess({ user });
          })
        )
      ),
      catchError((error) => {
        this.store.dispatch(loading({ status: false }));
        const message = error.error.error.message;
        this.store.dispatch(errorMessage({ message: message }));
        return of();
      })
    )
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          void this.router.navigate(['employee']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        map(() => {
          this.authService.logout();
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
