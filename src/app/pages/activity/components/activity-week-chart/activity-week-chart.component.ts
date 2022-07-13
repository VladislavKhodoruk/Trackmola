import { Component, Input } from "@angular/core";
import { Options, SeriesOptionsType } from 'highcharts';
import { BASIC_ACTIVITY_CHART_MY_ACTIVITY_PAGE } from '@pages/activity/constants/constants';
import { Project, TaskTrack } from "@shared/interfaces/interfaces";
import { getDataForChart } from "@pages/activity/helpers/helpers";

@Component({
  selector: 'app-activity-week-chart-component',
  templateUrl: 'activity-week-chart.html',
  styleUrls: ['activity-week-chart.scss'],
})
export class ActivityWeekChartComponent {
  @Input() activeTasks: TaskTrack[];
  @Input() projects: Project[];

  basicOptions: Options = BASIC_ACTIVITY_CHART_MY_ACTIVITY_PAGE;

  protected get seriesData(): SeriesOptionsType[] {
    getDataForChart(this.activeTasks, this.projects);
    return [
      {
        type: 'column',
        name: 'PSVOD',
        data: [2, 2, 4, 1, 3, 4],
        color: '#FF3D71',
      },
      {
        type: 'column',
        name: 'MDM',
        data: [4, 2, 1, 2, 4, 6],
        color: '#5F0A87',
      },
      {
        type: 'column',
        name: 'PAT',
        data: [3, 5, 2, 5, 6, 1],
        color: '#2EC4B6',
      },
    ];
  }
}
