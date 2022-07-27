import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { SeriesOptionsType } from 'highcharts';

import { BASIC_ACTIVITY_CHART_DASHBOARD_PAGE } from '@pages/dashboard/constants/constants';
import { Project, TaskTrack } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-activity-week-chart-component',
  styleUrls: ['activity-week-chart.component.scss'],
  templateUrl: 'activity-week-chart.component.html',
})
export class ActivityWeekChartComponent {
  @Input() activeTasks: TaskTrack[];
  @Input() projects: Project[];
  basicOptions = BASIC_ACTIVITY_CHART_DASHBOARD_PAGE;
  protected get seriesData(): SeriesOptionsType[] {
    return [
      {
        color: '#FF3D71',
        data: [4, 5, 3, 4, 5, 6, 7],
        name: 'PSVOD',
        type: 'column',
      },
      {
        color: '#5F0A87',
        data: [4, 2, 1, 2, 4, 6, 2],
        name: 'MDM',
        type: 'column',
      },
      {
        color: '#2EC4B6',
        data: [10, 5, 2, 5, 6, 1, 3],
        name: 'PAT',
        type: 'column',
      },
    ];
  }
}
