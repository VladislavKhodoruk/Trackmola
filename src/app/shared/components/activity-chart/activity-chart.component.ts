import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-activity-chart-component',
  templateUrl: 'activity-chart.component.html',
  styleUrls: ['activity-chart-component.scss'],
})
export class ActivityChartComponent implements OnInit {
  stock: Chart;
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  ngOnInit() {
    this.stock = new Chart({
      chart: {
        type: 'column',
        borderColor: 'var(--gray)',
        borderRadius: 15,
        borderWidth: 1,
        margin: [130, 130, 130, 130],
        width: 880,
        height: 595,
      },
      title: {
        text: 'Project activity',
        align: 'left',
        style: {
          fontSize: 'var(--offset-l)',
        },
        x: 31,
        y: 40,
      },
      xAxis: {
        categories: this.weekDays,
        crosshair: true,
      },
      yAxis: {
        title: {
          style: {
            display: 'none',
          },
        },
      },
      series: [
        {
          type: 'column',
          name: 'Tokyo',
          data: [2, 2, 4, 5],
          color: 'black',
        },
        {
          type: 'column',
          name: 'New York',
          data: [8],
        },
        {
          type: 'column',
          name: 'London',
          data: [4],
        },
        {
          type: 'column',
          name: 'Berlin',
          data: [4],
        },
      ],
    });
  }
}
