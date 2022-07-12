import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  changeActivityPeriodSuccess,
  getActivityTasks,
  getWeekReportTime,
} from '@pages/activity/store/activity.actions';
import { getPeriod } from '@shared/helpers/helpers';

import { TrackMolaState } from '@store/trackMola.state';
import { getActivePeriod } from '@pages/activity/store/activity.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-activity-container',
  template: `<app-employee-activity
    [period]="period$ | async"
    (selectedPeriod)="changePeriodOnStore($event)"
  ></app-employee-activity>`,
})
export class EmployeeActivityContainer {
  period$: Observable<string> = this.store$.select(getActivePeriod);
  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(getWeekReportTime());
    this.store$.dispatch(
      getActivityTasks({ period: getPeriod(new Date(), 'week') })
    );
  }

  changePeriodOnStore(period: string) {
    this.store$.dispatch(changeActivityPeriodSuccess({ choosePeriod: period }));
  }
}
