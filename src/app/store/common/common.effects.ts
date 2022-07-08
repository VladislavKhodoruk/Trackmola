import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TasksService } from '@shared/services/tasks.service';
import { UsersService } from '@shared/services/users.service';
import {
  errorMessage,
  getUserData,
  getUserDataSuccess,
  getAllUsers,
  getAllUsersSuccess,
  loading,
} from '@store/common/common.actions';
import { TrackMolaState } from '@store/trackMola.state';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';

@Injectable()
export class CommonEffects {
  getUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserData),
      switchMap(() =>
        this.usersService.currentUserProfile$.pipe(
          take(1),
          map((profileUser) => {
            this.store$.dispatch(loading({ status: false }));
            this.store$.dispatch(errorMessage({ message: '', loaded: true }));
            localStorage.setItem('AuthUserType', profileUser.role);
            localStorage.setItem('AuthUserPhoto', profileUser.photo);
            localStorage.setItem('AuthUserRole', profileUser.qualification);
            return getUserDataSuccess({ profileUser });
          }),
          catchError(() => {
            this.store$.dispatch(loading({ status: false }));
            return of();
          })
        )
      )
    )
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getUserDataSuccess),
        tap((): boolean => {
          this.router.navigate(['dashboard']);
          return true;
        })
      ),
    { dispatch: false }
  );

  getAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllUsers),
      switchMap(() =>
        this.usersService.allUsers$.pipe(
          take(1),
          map((users) => getAllUsersSuccess({ users }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private store$: Store<TrackMolaState>,
    private router: Router
  ) {}
}
