import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, Options, SeriesOptionsType } from 'highcharts';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-highcharts-chart',
  templateUrl: './highcharts-chart.component.html',
  styleUrls: ['./highcharts-chart.component.scss'],
})
export class HighchartsChartComponent implements OnChanges {
  @Input() options: Options;
  @Input() data: SeriesOptionsType[];
  @Input() idContainer: string;
  chart: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.data &&
      !isEqual(changes.data.currentValue, changes.data.previousValue)
    ) {
      this.chart = new Chart({
        ...this.options,
        series: this.data,
      });
    }
  }
}
