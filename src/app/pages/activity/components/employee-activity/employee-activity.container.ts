import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
  changeActivityPeriodSuccess,
  getWeekReportTime,
} from '@pages/activity/store/activity.actions';

import { getActivePeriod } from '@pages/activity/store/activity.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-employee-activity-container',
  template: `<app-employee-activity
    [period]="period$ | async"
    (selectPeriod)="changePeriodOnStore($event)"
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
