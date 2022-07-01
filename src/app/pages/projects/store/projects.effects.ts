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
  getUsersPhotoInProject,
  getUsersPhotoInProjectSuccess,
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
        console.log(data);
        const firstAndLastDay: FirstAndLastDay = data.period;
        const projectId: Project['id'] = data.projectId;
        return this.projectsPageService
          .getActiveTasksInProjects$(projectId, firstAndLastDay)
          .pipe(
            take(1),
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

  public getUsersPhotoInProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsersPhotoInProject),
      take(1),
      mergeMap(({ tasks }) => {
        console.log(tasks);
        return this.projectsPageService.getUsersInfoInProject$(tasks).pipe(
          take(1),
          map((response) => {
            const users: User[] = response;
            console.log(users);
            return getUsersPhotoInProjectSuccess({
              usersPhoto: [''],
            });
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private projectsPageService: ProjectsPageService,
    private store$: Store<TrackMolaState>
  ) {}
}
