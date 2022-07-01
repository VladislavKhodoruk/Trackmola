import { User } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsPageService } from '../services/projectsPage.service';
import { map, switchMap, take, mergeMap } from 'rxjs';
import { TaskTrack, Project } from '@pages/projects/interfaces/interfaces';

import {
  getActiveTasksInProject,
  getActiveTasksInProjectSuccess,
  getProjects,
  getProjectsSuccess,
  getTasks,
  getTasksSuccess,
  getAllUsers,
  getAllUsersSuccess,
} from './projects.actions';
import { TrackMolaState } from '@store/trackMola.state';
import { Store } from '@ngrx/store';
import { FirstAndLastDay } from '@shared/interfaces/interfaces';
import { UsersService } from '@shared/services/users.service';

@Injectable()
export class ProjectsEffects {
  public getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTasks),
      switchMap(({ period }) => {
        const firstAndLastDay: FirstAndLastDay = period;
        return this.projectsPageService.getTasks$(firstAndLastDay).pipe(
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
        return this.projectsPageService.getProjects$(projectsId).pipe(
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
      mergeMap((data) => {
        const firstAndLastDay: FirstAndLastDay = data.period;
        const projectId: Project['id'] = data.projectId;
        return this.projectsPageService
          .getActiveTasksInProjects$(projectId, firstAndLastDay)
          .pipe(
            map((response) => {
              const activeTasksInProject: TaskTrack[] = response;
              return getActiveTasksInProjectSuccess({
                tasks: activeTasksInProject,
              });
            })
          );
      })
    )
  );

  public getAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllUsers),
      switchMap(() =>
        this.usersService.users$.pipe(
          take(1),
          map((data) => getAllUsersSuccess({ usersInfo: data }))
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
