import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-activity-week-chart-container',
  template:
    '<app-activity-week-chart-component></app-activity-week-chart-component>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityWeekChartContainer {}
