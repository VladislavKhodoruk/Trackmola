import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getActivityTasks,
  getWeekReportTime,
} from '@pages/activity/store/activity.actions';
import { getPeriod } from '@shared/helpers/helpers';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-employee-activity-container',
  template: '<app-employee-activity></app-employee-activity>',
})
export class EmployeeActivityContainer {
  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(getWeekReportTime());
    this.store$.dispatch(
      getActivityTasks({ period: getPeriod(new Date(), 'week') })
    );
  }
}
