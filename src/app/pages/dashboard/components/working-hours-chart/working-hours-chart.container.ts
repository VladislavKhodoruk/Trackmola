import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { getWeekReportTime } from '@pages/dashboard/store/dashboard.selectors';
import { DashboardState } from '@pages/dashboard/store/dashboard.state';

@Component({
  selector: 'app-working-hours-chart-container',
  template: `<app-working-hours-chart
    [weekReportTime]="weekReportTime$ | async"
  ></app-working-hours-chart>`,
})
export class WorkingHoursChartContainer {
  weekReportTime$ = this.dashboardStore$.select(getWeekReportTime);

  constructor(private dashboardStore$: Store<DashboardState>) {}
}
