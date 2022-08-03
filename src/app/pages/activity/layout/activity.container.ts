import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { TrackMolaState } from '@store/trackMola.state';
import { Observable } from 'rxjs';
import { PeriodType } from '@shared/enums/enum';
import { getActivePeriod } from '@pages/activity/store/activity.selectors';
import {
  changeActivityPeriodSuccess,
  getWeekReportTime,
} from '@pages/activity/store/activity.actions';

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
