import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FirstAndLastDay } from '@shared/interfaces/interfaces';
import { map, switchMap, take, mergeMap, tap } from 'rxjs';

import { ActivityService } from '../services/activity.service';
import { Task } from '@pages/projects/interfaces/interfaces';
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
      switchMap((props) => {
        const firstAndLastDay: FirstAndLastDay = props;
        return this.activityService.getTasks$(firstAndLastDay).pipe(
          take(1),
          map((data) => {
            this.store$.dispatch(getActivityProjects({ data }));
            return getActivityTasksSuccess({ data });
          })
        );
      })
    )
  );

  public getActivityProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActivityProjects),
      switchMap((props) => {
        const tasks: Task[] = props.data;
        return this.activityService.getProjectsInTasks$(tasks).pipe(
          take(1),
          map((data) => getActivityProjectsSuccess({ data }))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private activityService: ActivityService,
    private store$: Store<TrackMolaState>
  ) {}
}
