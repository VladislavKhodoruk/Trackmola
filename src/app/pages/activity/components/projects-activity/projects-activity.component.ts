/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, Input, OnInit } from '@angular/core';
import { Options } from 'highcharts';

@Component({
  selector: 'app-projects-activity',
  templateUrl: './projects-activity.component.html',
  styleUrls: ['./projects-activity.component.scss'],
})
export class ProjectsActivityComponent implements OnInit {
  @Input() myData: any;

  chartOptions: Options;

  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },

      title: {
        text: '',
        verticalAlign: 'middle',
        align: 'center',
        x: 0,
        y: 0,
        style: {
          font: 'var(--font-titleBig)',
          color: 'var(--aqua)',
        },
      },

      tooltip: {
        enabled: false,
      },

      accessibility: {
        point: {
          valueSuffix: '%',
        },
        enabled: false,
      },

      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
          },
          innerSize: '70%',
          colors: ['var(--aqua)', 'var(--rose)', 'var(--galaxy)'],
          cursor: 'pointer',
          showInLegend: true,
          states: {
            hover: {
              halo: null,
              brightness: 0,
            },
          },
          point: {
            events: {
              mouseOver: ({ target }) => {
                const point = target as any;
                const percentage: number = point.percentage.toFixed(1);
                point.series.chart.update({
                  title: { text: `${percentage}%` },
                });
                point.graphic
                  .attr({
                    'stroke-width': 10,
                    stroke: point.color,
                    zIndex: 3,
                  })
                  .add();
              },
              mouseOut: ({ target }) => {
                const point = target as any;
                point.series.chart.update({
                  title: { text: '' },
                });
                point.graphic
                  .attr({
                    'stroke-width': 1,
                    stroke: point.color,
                    filter: 'transparent',
                  })
                  .add();
              },
            },
          },
        },
      },

      series: [
        {
          type: 'pie',
          data: this.myData,
        },
      ],

      legend: {
        align: 'center',
        enabled: true,
        symbolHeight: 24,
        symbolWidth: 24,
        itemDistance: 85,
        itemMarginTop: 50,
        itemStyle: {
          font: 'var(--font-current)',
        },
      },

      credits: {
        enabled: false,
      },
    };
  }
}
