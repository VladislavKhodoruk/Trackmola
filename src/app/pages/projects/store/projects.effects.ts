import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsService } from '../services/projects.service';
import { map, switchMap, take, mergeMap } from 'rxjs';
import {
  Task,
  TaskTrack,
  Project,
} from '@pages/projects/interfaces/interfaces';

import {
  getActiveTasksInProject,
  getActiveTasksInProjectSuccess,
  getProjects,
  getProjectsSuccess,
  getTasks,
  getTasksSuccess,
} from './projects.actions';
import { TrackMolaState } from '@store/trackMola.state';
import { Store } from '@ngrx/store';
import { FirstAndLastDay } from '@shared/interfaces/interfaces';

@Injectable()
export class ProjectsEffects {
  public getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTasks),
      switchMap(({ period }) => {
        const firstAndLastDay: FirstAndLastDay = period;
        return this.projectsService.getTasks$(firstAndLastDay).pipe(
          take(1),
          map((data) => {
            const tasks: TaskTrack[] = data;
            this.store$.dispatch(getProjects({ tasks }));
            return getTasksSuccess({ tasks });
          })
        );
      })
    )
  );

  public getProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProjects),
      switchMap(({ tasks }) => {
        const projectsId = tasks.map((task) => task.projectId);
        return this.projectsService.getProjects$(projectsId).pipe(
          take(1),
          map((data) => {
            const projects: Project[] = data;
            return getProjectsSuccess({ projects });
          })
        );
      })
    )
  );

  public getActiveTasksInProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActiveTasksInProject),
      mergeMap(({ projectId, period }) => {
        const firstAndLastDay: FirstAndLastDay = period;
        return this.projectsService
          .getActiveTasksInProjects$(projectId, firstAndLastDay)
          .pipe(
            take(1),
            map((data) => {
              const activeTasksInProject: TaskTrack[] = data;
              return getActiveTasksInProjectSuccess({
                tasks: activeTasksInProject,
              });
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
    private store$: Store<TrackMolaState>
  ) {}
}
