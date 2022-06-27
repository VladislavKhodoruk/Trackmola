import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsService } from '@shared/services/projects.service';
import { map, mergeMap, switchMap, take } from 'rxjs';
import { UserProfileInProject } from '@pages/projects/interfaces/interfaces';

import {
  getProjects,
  getProjectsSuccess,
  getTasksInProject,
  getTasksInProjectSuccess,
  getUsersProfileInProject,
  getUsersProfileInProjectSuccess,
} from './projects.actions';

@Injectable()
export class ProjectsEffects {
  public getProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProjects),
      switchMap(() =>
        this.projectsService.projects$.pipe(
          take(1),
          map((data) => getProjectsSuccess({ data }))
        )
      )
    )
  );

  public getTasksInProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTasksInProject),
      mergeMap((action) =>
        this.projectsService.tasksInProject$(action.id).pipe(
          take(1),
          map((data) => getTasksInProjectSuccess({ data }))
        )
      )
    )
  );

  public getUsersInProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsersProfileInProject),
      mergeMap((action) =>
        this.projectsService.usersInProject$(action.team).pipe(
          take(1),
          map((data) => {
            const result: UserProfileInProject[] = data.map((profile) => {
              profile.projectId = action.id;
              return profile;
            });
            return getUsersProfileInProjectSuccess({ usersProfiles: result });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ) {}
}
