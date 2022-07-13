import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { SHORT_NAMES_OF_THE_WEEK_UPPERCASE } from '@shared/constants/constants';

@Component({
  selector: 'app-activity-chart-component',
  templateUrl: 'activity-chart.component.html',
  styleUrls: ['activity-chart-component.scss'],
})
export class ActivityChartComponent implements OnInit {
  stock: Chart;
  ngOnInit() {
    this.stock = new Chart({
      chart: {
        type: 'column',
        borderColor: 'var(--gray)',
        borderRadius: 15,
        borderWidth: 1,
        margin: [130, 130, 170, 130],
        width: 880,
        height: 594,
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
        categories: SHORT_NAMES_OF_THE_WEEK_UPPERCASE,
        crosshair: true,
        gridLineDashStyle: null,
        gridLineWidth: 0,
        lineWidth: 0,
        labels: {
          style: {
            fontWeight: '500',
            fontFamily: 'var(--font-calendar)',
            fontSize: 'var(--offset-sm)',
            color: 'var(--gray3)',
          },
        },
      },
      yAxis: {
        gridLineWidth: 0,
        lineWidth: 0,
        title: {
          style: {
            display: 'none',
          },
        },
      },
      legend: {
        floating: true,
        itemDistance: 80,
        itemMarginBottom: 50,
        symbolHeight: 26,
        itemStyle: {
          fontFamily: 'var(--font-current)',
          fontSize: 'var(--offset-sm)',
          color: 'var(--black)',
          fontWeight: '300',
        },
      },
      series: [
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
      ],
    });
  }
}
