import { ProfileUser } from 'src/app/shared/interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { TasksService } from 'src/app/shared/services/tasks.service';
import { UsersService } from 'src/app/shared/services/users.service';
import {
  errorMessage,
  getUserData,
  getUserDataSuccess,
  loading,
  getAllTasks,
  getAllTasksSuccess,
} from 'src/app/store/shared/shared.actions';
import { TrackMolaState } from 'src/app/store/trackMola.state';

@Injectable()
export class SharedEffects {
  getUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserData),
      switchMap(() =>
        this.usersService.currentUserProfile$.pipe(
          take(1),
          map((data) => {
            const profileUser: ProfileUser = data as ProfileUser;
            this.store$.dispatch(loading({ status: false }));
            this.store$.dispatch(errorMessage({ message: '', loaded: true }));
            return getUserDataSuccess({ data: profileUser });
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
      ofType(getAllTasks),
      switchMap(() =>
        this.tasksService.getTasks().pipe(
          take(1),
          map((data) => getAllTasksSuccess({ tasks: data }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private tasksService: TasksService,
    private store$: Store<TrackMolaState>,
    private router: Router
  ) {}
}
