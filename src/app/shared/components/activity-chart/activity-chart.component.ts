import { Component, ElementRef, ViewChild } from '@angular/core';
import { HighchartsService } from "@shared/services/active-charts.service";

@Component({
  selector: 'app-activity-chart-component',
  templateUrl: 'activity-chart.component.html',
  styleUrls: ['activity-chart-component.scss'],
})
export class ActivityChartComponent {
  @ViewChild('charts') public chartEl: ElementRef;

  ngOnInit() {
    this.highcharts.createChart(this.chartEl.nativeElement, this.myOptions);
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  myOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Stacked bar chart',
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total fruit consumption',
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
      },
    },
    series: [
      {
        name: 'John',
        data: [5, 3, 4, 7, 2],
      },
      {
        name: 'Jane',
        data: [2, 2, 3, 2, 1],
      },
      {
        name: 'Joe',
        data: [3, 4, 4, 2, 5],
      },
    ],
  };

  constructor(private highcharts: HighchartsService) {}
}

