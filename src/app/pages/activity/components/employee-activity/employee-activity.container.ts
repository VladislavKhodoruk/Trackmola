import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getActivityTasks } from '@pages/activity/store/activity.actions';
import { getFirstAndLastDay } from '@shared/helpers/helpers';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-employee-activity-container',
  template: '<app-employee-activity></app-employee-activity>',
})
export class EmployeeActivityContainer {
  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(
      getActivityTasks(getFirstAndLastDay(new Date(), 'month'))
    );
  }
}
