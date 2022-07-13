import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  changeActivityPeriodSuccess,
  getWeekReportTime,
} from '@pages/activity/store/activity.actions';

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
  }

  changePeriodOnStore(period: string) {
    this.store$.dispatch(changeActivityPeriodSuccess({ choosePeriod: period }));
  }
}
