import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Options, SeriesOptionsType } from 'highcharts';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-highcharts-chart',
  styleUrls: ['./highcharts-chart.component.scss'],
  templateUrl: './highcharts-chart.component.html',
})
export class HighchartsChartComponent implements OnChanges {
  @Input() options: Options;
  @Input() data: SeriesOptionsType[];
  @Input() idContainer: string;
  chart: Chart;
  stoke: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.data &&
      this.data.length &&
      !isEqual(changes.data.currentValue, changes.data.previousValue)
    ) {
      this.chart = new Chart({
        ...this.options,
        series: this.data,
      });
    }
  }
}
