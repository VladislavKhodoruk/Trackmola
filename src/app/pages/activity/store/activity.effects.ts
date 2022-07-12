import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getWeekReportTime,
  getWeekReportTimeSuccess,
} from './activity.actions';
import { map, switchMap, take } from 'rxjs';

import { ActivityService } from '@pages/activity/services/activity.service';

@Injectable()
export class ActivityEffects {
  getReportTime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getWeekReportTime),
      switchMap(() =>
        this.activityService.getWeekTasks$.pipe(
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

  constructor(
    private actions$: Actions,
    private activityService: ActivityService
  ) {}
}
