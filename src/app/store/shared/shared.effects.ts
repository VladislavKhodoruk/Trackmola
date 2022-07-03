import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TasksService } from '@shared/services/tasks.service';
import { UsersService } from '@shared/services/users.service';
import {
  errorMessage,
  getAllProjects,
  getAllProjectsSuccess,
  getAllTasks,
  getAllTasksSuccess,
  getUserData,
  getUserDataSuccess,
  loading,
} from '@store/shared/shared.actions';
import { TrackMolaState } from '@store/trackMola.state';
import { catchError, map, of, switchMap, take, tap, mergeMap } from 'rxjs';
import { ProjectsService } from '@shared/services/projects.service';

@Injectable()
export class SharedEffects {
  getUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserData),
      switchMap(() =>
        this.usersService.currentUserProfile$.pipe(
          take(1),
          map((data) => {
            this.store$.dispatch(loading({ status: false }));
            this.store$.dispatch(errorMessage({ message: '', loaded: true }));
            localStorage.setItem('AuthUserType', data.type);
            localStorage.setItem('AuthUserPhoto', data.photo);
            return getUserDataSuccess({ data });
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

  getAllProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllProjects),
      mergeMap(() =>
        this.project.getAllProjects$().pipe(
          take(1),
          map((data) => getAllProjectsSuccess({ project: data }))
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
    private project: ProjectsService
  ) {}
}
