import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, take } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';
import { errorMessage, loading } from 'src/app/store/shared/shared.actions';
import { TrackMolaState } from 'src/app/store/trackMola.state';
import { getUserData, getUserDataSuccess } from './employee.actions';

@Injectable()
export class EmployeeEffects {
  getUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserData),
      switchMap(() =>
        this.usersService.currentUserProfile$.pipe(
          take(1),
          map((data) => {
            this.store.dispatch(loading({ status: false }));
            this.store.dispatch(errorMessage({ message: '', loaded: true }));
            return getUserDataSuccess({ data: data! });
          }),
          catchError(() => {
            this.store.dispatch(loading({ status: false }));
            return of();
          })
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private store: Store<TrackMolaState>
  ) {}
}
