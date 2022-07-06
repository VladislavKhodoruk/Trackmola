import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsPageService } from '../services/projectsPage.service';
import { map, switchMap, take } from 'rxjs';

import {
  getTaskTracks,
  getTaskTracksSuccess,
  getProjects,
  getProjectsSuccess,
  getUsers,
  getUsersSuccess,
  getTasks,
  getTasksSuccess,
} from './projects.actions';

import { UsersService } from '@shared/services/users.service';
import { Store } from '@ngrx/store';
import { TrackMolaState } from '@store/trackMola.state';

@Injectable()
export class ProjectsEffects {
  public getTaskTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTaskTracks),
      switchMap(() =>
        this.projectsPageService.taskTracks$.pipe(
          take(1),
          map((taskTracks) => getTaskTracksSuccess({ taskTracks }))
        )
      )
    )
  );

  public getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTasks),
      switchMap(() =>
        this.projectsPageService.tasks$.pipe(
          take(1),
          map((tasks) => getTasksSuccess({ tasks }))
        )
      )
    )
  );

  public getProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProjects),
      switchMap(() =>
        this.projectsPageService.projects$.pipe(
          take(1),
          map((projects) => getProjectsSuccess({ projects }))
        )
      )
    )
  );

  public getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap(() =>
        this.usersService.users$.pipe(
          take(1),
          map((users) => getUsersSuccess({ users }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projectsPageService: ProjectsPageService,
    private usersService: UsersService,
    private store$: Store<TrackMolaState>
  ) {}
}
