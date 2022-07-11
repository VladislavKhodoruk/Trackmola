import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UsersService } from '@shared/services/users.service';
import {
  errorMessage,
  getUserData,
  getUserDataSuccess,
  getAllUsers,
  getAllUsersSuccess,
  loading,
  deleteTaskTrack,
  updateTaskTrack,
} from '@store/common/common.actions';
import { TrackMolaState } from '@store/trackMola.state';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { TasksService } from '@shared/services/tasks.service';

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

  deleteTaskTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTaskTrack),
      switchMap((action) => {
        return this.tasksService.removeTask(action.id);
      })
    )
  );

  updateTaskTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTaskTrack),
      switchMap((action) => {
        return this.tasksService.updateTask(action.tasktrack);
      })
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
