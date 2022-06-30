import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, Options, SeriesOptionsType } from 'highcharts';

@Component({
  selector: 'app-highcharts-chart',
  templateUrl: './highcharts-chart.component.html',
  styleUrls: ['./highcharts-chart.component.scss'],
})
export class HighchartsChartComponent implements OnChanges {
  @Input() options: Options;
  @Input() data: SeriesOptionsType[];
  chart: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.chart = new Chart('chart-container', {
        ...this.options,
        series: this.data,
      });
    }
  }
}
