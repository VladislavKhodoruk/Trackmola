import { Component } from "@angular/core";
import { Options, SeriesOptionsType } from "highcharts";
import {
  BASIC_ACTIVITY_CHART_DASHBOARD_PAGE,
} from "@pages/dashboard/constants/constants";

@Component({
  selector: 'app-activity-week-chart-component',
  templateUrl: 'activity-week-chart.component.html',
  styleUrls: ['activity-week-chart.component.scss']
})

export class ActivityWeekChartComponent {

  basicOptions = BASIC_ACTIVITY_CHART_DASHBOARD_PAGE;

  protected get seriesData(): SeriesOptionsType[] {
    return [
      {
        type: 'column',
        name: 'PSVOD',
        data: [4, 5, 3, 4, 5, 6, 7],
        color: '#FF3D71',
      },
      {
        type: 'column',
        name: 'MDM',
        data: [4, 2, 1, 2, 4, 6, 2],
        color: '#5F0A87',
      },
      {
        type: 'column',
        name: 'PAT',
        data: [3, 5, 2, 5, 6, 1, 3],
        color: '#2EC4B6',
      },
    ];
  }
}
