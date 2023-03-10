import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap, take } from 'rxjs';

import {
  getWeekReportTime,
  getWeekReportTimeSuccess,
} from './dashboard.actions';

import { TasksService } from '@shared/services/tasks.service';
@Injectable()
export class DashboardEffects {
  getReportTime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getWeekReportTime),
      switchMap(() =>
        this.tasksService.getWeekTasks$.pipe(
          take(1),
          map((data) => {
            const weekReportTime = data.reduce(
              (result, item) => (result += item.duration),
              0
            );
            return getWeekReportTimeSuccess({ weekReportTime });
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private tasksService: TasksService) {}
}
