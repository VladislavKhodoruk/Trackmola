import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsService } from '../services/projects.service';
import { map, switchMap, take } from 'rxjs';
import {
  Task,
  TaskTrack,
  Project,
} from '@pages/projects/interfaces/interfaces';

import {
  getProjects,
  getProjectsSuccess,
  getTasks,
  getTasksSuccess,
} from './projects.actions';
import { TrackMolaState } from '@store/trackMola.state';
import { Store } from '@ngrx/store';

@Injectable()
export class ProjectsEffects {
  public getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTasks),
      switchMap(() =>
        this.projectsService.tasks$.pipe(
          take(1),
          map((data) => {
            const tasks: TaskTrack[] = data;
            console.log(tasks);
            this.store$.dispatch(getProjects({ tasks }));
            return getTasksSuccess({ tasks });
          })
        )
      )
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
            console.log(projects);
            return getProjectsSuccess({ projects });
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
