import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK,
  MAX_VALUE_WEEK_REPORT_TIME,
} from '@pages/dashboard/constants/constants';

@Component({
  selector: 'app-working-hours-chart',
  templateUrl: './working-hours-chart.component.html',
  styleUrls: ['./working-hours-chart.component.scss'],
})
export class WorkingHoursChartComponent implements OnChanges {
  @Input() weekReportTime: number;

  weekLeftTime: number;
  sizeReportTimeChart: number;
  numberOfHoursInWorkingWeek: number = DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.weekReportTime) {
      if (this.weekReportTime > this.numberOfHoursInWorkingWeek) {
        this.sizeReportTimeChart = MAX_VALUE_WEEK_REPORT_TIME;
        return;
      }
      this.weekLeftTime = this.numberOfHoursInWorkingWeek - this.weekReportTime;
      this.sizeReportTimeChart =
        (this.weekReportTime / this.numberOfHoursInWorkingWeek) *
        MAX_VALUE_WEEK_REPORT_TIME;
    }
  }
}
