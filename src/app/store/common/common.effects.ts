import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, map, of, switchMap, take, tap, mergeMap } from 'rxjs';

import { Route } from '@shared/enums/enum';
import { TasksService } from '@shared/services/tasks.service';
import { UsersService } from '@shared/services/users.service';
import { VacationsService } from '@shared/services/vacations.service';
import {
  errorMessage,
  getUserData,
  getUserDataSuccess,
  getAllUsers,
  getAllUsersSuccess,
  loading,
  deleteTaskTrack,
  updateTaskTrack,
  addTaskTrack,
  getAllVacations,
  getAllVacationsSuccess,
} from '@store/common/common.actions';
import { TrackMolaState } from '@store/trackMola.state';

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
            this.store$.dispatch(errorMessage({ loaded: true, message: '' }));
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
          this.router.navigate([Route.Dashboard]);
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

  deleteTaskTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTaskTrack),
      mergeMap(({ id }) => this.tasksService.removeTask(id))
    )
  );

  updateTaskTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTaskTrack),
      switchMap(({ tasktrack }) => this.tasksService.updateTask(tasktrack))
    )
  );

  addTaskTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTaskTrack),
      switchMap(({ tasktrack }) => this.tasksService.setTaskTrack(tasktrack))
    )
  );

  getAllVacations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllVacations),
      switchMap(() =>
        this.vacationsService.allVacations$.pipe(
          take(1),
          map((vacations) => getAllVacationsSuccess({ vacations }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private tasksService: TasksService,
    private store$: Store<TrackMolaState>,
    private router: Router,
    private vacationsService: VacationsService
  ) {}
}
