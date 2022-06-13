import { Store } from '@ngrx/store';
import {
  getUserType,
  loginStart,
  loginSuccess,
  logout,
} from './authrorization.actions';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { catchError, map, of, tap, Observable, switchMap, take } from 'rxjs';
import { TrackMolaState } from 'src/app/store/trackMola.state';
import { errorMessage, loading } from 'src/app/store/shared/shared.actions';
import { AuthorizationService } from '../services/authorization.service';
import { Router } from '@angular/router';
import { UsersService } from '../../../shared/services/users.service';
import { FirebaseCodeError } from '../interfaces/interface';
import { ProfileUser } from 'src/app/shared/interfaces/interfaces';

@Injectable()
export class AuthrorizationEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStart),
      switchMap((action) =>
        this.authorizationService.login(action.email, action.password).pipe(
          map(() => {
            this.store.dispatch(loading({ status: false }));
            this.store.dispatch(errorMessage({ message: '', loaded: true }));
            return getUserType();
          }),
          catchError((error: FirebaseCodeError) => {
            this.store.dispatch(loading({ status: false }));
            const message = this.authorizationService.authorizationError(
              error.code
            );
            this.store.dispatch(errorMessage({ message, loaded: false }));
            return of();
          })
        )
      )
    )
  );

  getUserType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserType),
      switchMap(() =>
        this.usersService.currentUserProfile$.pipe(
          take(1),
          map((data) => {
            const user: ProfileUser = data!;
            return loginSuccess({ userType: user.type });
          })
        )
      )
    )
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ userType }): void => {
          this.router.navigate([userType]);
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
    private store: Store<TrackMolaState>,
    private usersService: UsersService,
    private router: Router
  ) {}
}
