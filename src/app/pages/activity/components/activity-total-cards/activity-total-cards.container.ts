import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  getReportTime,
  getReportOvertime,
  getActivePeriod,
} from '@pages/activity/store/activity.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-activity-total-cards-container',
  template: `<app-activity-total-cards
    [reportTime]="reportTime$ | async"
    [reportOvertime]="reportOvertime$ | async"
    [periodType]="periodType$ | async"
  ></app-activity-total-cards>`,
})
export class ActivityTotalCardsContainer {
  reportTime$ = this.store$.select(getReportTime);
  reportOvertime$ = this.store$.select(getReportOvertime);
  periodType$ = this.store$.select(getActivePeriod);

  constructor(private store$: Store<TrackMolaState>) {}
}
