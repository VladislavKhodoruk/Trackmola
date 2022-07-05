import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsPageService } from '../services/projectsPage.service';
import { map, switchMap, take } from 'rxjs';

import {
  getAllTaskTracks,
  getAllTaskTracksSuccess,
  getAllProjects,
  getAllProjectsSuccess,
  getAllUsers,
  getAllUsersSuccess,
} from './projects.actions';

import { UsersService } from '@shared/services/users.service';

@Injectable()
export class ProjectsEffects {
  public getAllTaskTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTaskTracks),
      switchMap(({ period }) =>
        this.projectsPageService.getAllTaskTracks$(period).pipe(
          take(1),
          map((taskTracks) => getAllTaskTracksSuccess({ taskTracks }))
        )
      )
    )
  );

  public getAllProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllProjects),
      switchMap(() =>
        this.projectsPageService.allProjects$.pipe(
          take(1),
          map((projects) => getAllProjectsSuccess({ projects }))
        )
      )
    )
  );

  public getAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllUsers),
      switchMap(() =>
        this.usersService.users$.pipe(
          take(1),
          map((users) => getAllUsersSuccess({ users }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projectsPageService: ProjectsPageService,
    private usersService: UsersService
  ) {}
}
