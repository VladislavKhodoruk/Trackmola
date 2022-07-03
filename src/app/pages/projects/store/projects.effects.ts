import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsPageService } from '../services/projectsPage.service';
import { map, switchMap, take } from 'rxjs';
import { Project, TaskTrack, User } from '@shared/interfaces/interfaces';

import {
  getAllTasks,
  getAllTasksSuccess,
  getAllProjects,
  getAllProjectsSuccess,
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

  public getAllProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllProjects),
      switchMap(() =>
        this.projectsPageService.allProjects$.pipe(
          take(1),
          map((data) => {
            const projects: Project[] = data;
            return getAllProjectsSuccess({ projects });
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
          map((data) => {
            const users: User[] = data;
            return getAllUsersSuccess({ users });
          })
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
