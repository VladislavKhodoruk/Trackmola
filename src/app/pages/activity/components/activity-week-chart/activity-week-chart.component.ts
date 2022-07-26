import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Options, SeriesOptionsType } from 'highcharts';

import { BASIC_ACTIVITY_CHART_MY_ACTIVITY_PAGE } from '@pages/activity/constants/constants';
import { getDataForChart } from '@shared/helpers/helpers';
import { Project, TaskTrack } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-activity-week-chart-component',
  styleUrls: ['activity-week-chart.scss'],
  templateUrl: 'activity-week-chart.html',
})
export class ActivityWeekChartComponent {
  @Input() activeTasks: TaskTrack[];
  @Input() projects: Project[];

  basicOptions: Options = BASIC_ACTIVITY_CHART_MY_ACTIVITY_PAGE;

  protected get seriesData(): SeriesOptionsType[] {
    if (this.activeTasks && this.projects) {
      return getDataForChart(this.activeTasks, this.projects);
    }
  }
}
