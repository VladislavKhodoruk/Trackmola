import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksService } from '@shared/services/tasks.service';
import {
  getAllTasks,
  getAllTasksSuccess,
  getAllProjects,
  getAllProjectsSuccess,
} from '@pages/report/store/report.actions';
import { map, switchMap, take } from 'rxjs';
import { ProjectsService } from '@shared/services/projects.service';

@Injectable()
export class ReportEffects {
  getAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTasks),
      switchMap(() =>
        this.tasksService.allTasks$.pipe(
          take(1),
          map((data) => {
            const allTasks = data;
            return getAllTasksSuccess({ allTasks });
          })
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
          map((data) => getAllProjectsSuccess({ allProjects: data }))
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
