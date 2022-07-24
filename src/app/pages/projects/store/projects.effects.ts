import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { switchMap } from 'rxjs';

import { addTask } from '@pages/projects/store/projects.actions';
import { TasksService } from '@shared/services/tasks.service';

@Injectable()
export class ProjectsEffects {
  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      switchMap(({ task }) => this.tasksService.setTask(task))
    )
  );

  constructor(private actions$: Actions, private tasksService: TasksService) {}
}
