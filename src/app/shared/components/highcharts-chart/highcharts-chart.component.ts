import { Component, Input, OnInit } from '@angular/core';
import { Chart, Options } from 'highcharts';

@Component({
  selector: 'app-highcharts-chart',
  templateUrl: './highcharts-chart.component.html',
  styleUrls: ['./highcharts-chart.component.scss'],
})
export class HighchartsChartComponent implements OnInit {
  @Input() options: Options;
  chart: Chart;

  ngOnInit(): void {
    this.chart = new Chart('chart-container', this.options);
  }
}
