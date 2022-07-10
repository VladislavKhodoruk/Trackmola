import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ActivityService } from '../services/activity.service';

@Injectable()
export class ActivityEffects {
  constructor(
    private actions$: Actions,
    private activityService: ActivityService
  ) {}
}
