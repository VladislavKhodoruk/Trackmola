import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsService } from '@shared/services/projects.service';
import { map, mergeMap, switchMap, take } from 'rxjs';
import {
  getProjects,
  getProjectsSuccess,
  getTasksInProject,
  getTasksInProjectSuccess,
} from './projects.actions';

@Injectable()
export class ProjectsEffects {
  getProjects$ = createEffect(() =>
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

  getTasksInProject$ = createEffect(() =>
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

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ) {}
}
