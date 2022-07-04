import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getWeekReportTime } from '@pages/activity/store/activity.actions';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-employee-activity-container',
  template: '<app-employee-activity></app-employee-activity>',
})
export class EmployeeActivityContainer {
  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(getWeekReportTime());
  }
}
