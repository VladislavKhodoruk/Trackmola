import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsPageService } from '../services/projectsPage.service';
import { map, switchMap, take } from 'rxjs';
import { Project, TaskTrack } from '@shared/interfaces/interfaces';

import {
  getAllTasks,
  getAllTasksSuccess,
  getProjects,
  getProjectsSuccess,
  getAllUsers,
  getAllUsersSuccess,
} from './projects.actions';

import { UsersService } from '@shared/services/users.service';

@Injectable()
export class ProjectsEffects {
  public getAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTasks),
      switchMap(({ period }) =>
        this.projectsPageService.getAllTasks$(period).pipe(
          take(1),
          map((data) => {
            const tasks: TaskTrack[] = data;
            return getAllTasksSuccess({ tasks });
          })
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
          map((data) => {
            const projects: Project[] = data;
            return getProjectsSuccess({ projects });
          })
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
          map((data) => getAllUsersSuccess({ usersInfo: data }))
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
