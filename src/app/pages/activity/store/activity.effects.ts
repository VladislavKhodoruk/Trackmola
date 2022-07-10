import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs';

import { ActivityService } from '../services/activity.service';
import {
  getActivityProjects,
  getActivityProjectsSuccess,
  getActivityTasks,
  getActivityTasksSuccess,
} from './activity.actions';
import { TrackMolaState } from '@store/trackMola.state';
import { Store } from '@ngrx/store';
@Injectable()
export class ActivityEffects {
  public getActivityTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActivityTasks),
      switchMap(({ period }) =>
        this.activityService.getTasks$(period).pipe(
          take(1),
          map((tasks) => {
            this.store$.dispatch(getActivityProjects({ tasks }));
            return getActivityTasksSuccess({ tasks });
          })
        )
      )
    )
  );

  public getActivityProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActivityProjects),
      switchMap(({ tasks }) =>
        this.activityService.getProjectsInTasks$(tasks).pipe(
          take(1),
          map((projects) => getActivityProjectsSuccess({ projects }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private activityService: ActivityService,
    private store$: Store<TrackMolaState>
  ) {}
}
