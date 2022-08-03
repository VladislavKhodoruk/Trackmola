import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
  changeActivityPeriodSuccess,
  getWeekReportTime,
} from '@pages/activity/store/activity.actions';
import { getActivePeriod } from '@pages/activity/store/activity.selectors';
import { PeriodType } from '@shared/enums/enum';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-activity-container',
  template: `<app-activity
    [userType]="userType"
    [period]="period$ | async"
    (selectPeriod)="changePeriodOnStore($event)"
  ></app-activity>`,
})
export class ActivityContainer {
  period$: Observable<PeriodType> = this.store$.select(getActivePeriod);
  readonly userType: string = localStorage.getItem('AuthUserType');

  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(getWeekReportTime());
  }

  changePeriodOnStore(period: PeriodType) {
    this.store$.dispatch(changeActivityPeriodSuccess({ choosePeriod: period }));
  }
}
