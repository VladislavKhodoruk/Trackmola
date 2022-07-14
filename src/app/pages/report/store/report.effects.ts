import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap, take } from 'rxjs';

import {
  getAllTasks,
  getAllTasksSuccess,
  getAllProjects,
  getAllProjectsSuccess,
} from '@pages/report/store/report.actions';
import { ProjectsService } from '@shared/services/projects.service';
import { TasksService } from '@shared/services/tasks.service';

@Injectable()
export class ReportEffects {
  getAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTasks),
      switchMap(() =>
        this.tasksService.allTasks$.pipe(
          take(1),
          map((allTasks) => getAllTasksSuccess({ allTasks }))
        )
      )
    )
  );

  getAllProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllProjects),
      switchMap(() =>
        this.projectsService.allProjects$.pipe(
          take(1),
          map((allProjects) => getAllProjectsSuccess({ allProjects }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
    private projectsService: ProjectsService
  ) {}
}
