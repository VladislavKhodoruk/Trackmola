import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { getWeekReportTime } from '@pages/activity/store/activity.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-activity-total-cards-container',
  template: `<app-activity-total-cards
    [weekReportTime]="weekReportTime$ | async"
  ></app-activity-total-cards>`,
})
export class ActivityTotalCardsContainer {
  weekReportTime$ = this.store$.select(getWeekReportTime);

  constructor(private store$: Store<TrackMolaState>) {}
}
