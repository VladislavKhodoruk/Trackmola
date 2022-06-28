import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';

@Component({
  selector: 'app-projects-activity',
  templateUrl: './projects-activity.component.html',
  styleUrls: ['./projects-activity.component.scss'],
})
export class ProjectsActivityComponent {
  chartOptions: Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    title: {
      text: '47%',
      verticalAlign: 'middle',
      align: 'center',
      x: 0,
      y: 0,
      style: {
        font: 'var(--font-titleBig)',
        textAlign: 'center',
        color: 'var(--aqua)',
      },
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        type: 'pie',
        innerSize: '70%',
        colors: ['var(--aqua)', 'var(--rose)', 'var(--galaxy)'],
        cursor: 'pointer',
        data: [
          ['PSVOD', 58.9],
          ['MDM', 13.29],
          ['PAT', 13],
        ],

        showInLegend: true,
      },
    ],
    legend: {
      align: 'center',
      enabled: true,
      symbolHeight: 24,
      symbolWidth: 24,
      itemDistance: 88,
      itemMarginTop: 50,
      itemStyle: {
        font: 'var(--font-current)',
        display: 'flex',
        gap: '10px',
      },
      labelFormatter: function () {
        console.log(this);
        return `<div class='center'>${this.name}</div>`;
      },
    },

    credits: {
      enabled: false,
    },
  };
  chart = new Chart(this.chartOptions);
}
