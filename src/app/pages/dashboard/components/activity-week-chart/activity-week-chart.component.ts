import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { SeriesOptionsType } from 'highcharts';

import { BASIC_ACTIVITY_CHART_DASHBOARD_PAGE } from '@pages/dashboard/constants/constants';
import { getDataForChart } from '@shared/helpers/helpers';
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
    if (this.activeTasks && this.projects) {
      return getDataForChart(this.activeTasks, this.projects);
    }
  }
}
