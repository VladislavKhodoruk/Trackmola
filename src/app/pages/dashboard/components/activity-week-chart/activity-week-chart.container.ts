import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-activity-week-chart-container',
  template:
    '<app-activity-week-chart-component></app-activity-week-chart-component>',
})
export class ActivityWeekChartContainer {}
